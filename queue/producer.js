const amqp = require('amqplib');

async function sendToQueue(notification) {
  try {
    const conn = await amqp.connect('amqp://localhost');
    const channel = await conn.createChannel();

    const queue = 'notificationsQueue';
    await channel.assertQueue(queue, { durable: true });

    channel.sendToQueue(queue, Buffer.from(JSON.stringify(notification)), {
      persistent: true
    });

    console.log('📤 Notification added to queue');
  } catch (err) {
    console.error('Queue Error:', err);
  }
}

module.exports = sendToQueue;
