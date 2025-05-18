const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const sendToQueue = require('../queue/producer');



router.post('/', async (req, res) => {
  const { userId, type, message } = req.body;

  if (!userId || !type || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const notification = new Notification({ userId, type, message });
    await notification.save();
await sendToQueue(notification); 

res.status(201).json({ message: 'Notification created and queued', notification });

  } catch (err) {
    console.error('Error saving notification:', err);
    res.status(500).json({ error: 'Server error' });
  }
});
router.get('/users/:id/notifications', async (req, res) => {
    const userId = req.params.id;
  
    try {
      const notifications = await Notification.find({ userId }, '-__v').sort({ createdAt: -1 });
      res.json({ count: notifications.length, notifications });
    } catch (err) {
      console.error('Error fetching notifications:', err);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  
module.exports = router;
