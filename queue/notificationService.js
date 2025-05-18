// notificationService.js

async function sendEmail(notification) {
    // Simulate sending email, replace with actual email logic
    const { email, name, message } = notification;
  
    if (!email) {
      throw new Error("Email is missing");
    }
  
    // For demo, randomly fail to simulate retry
    const success = Math.random() > 0.3; // 70% chance of success
  
    if (!success) {
      throw new Error("Temporary email service failure");
    }
  
    console.log(`📧 Sent email to ${name} <${email}> with message: "${message}"`);
  }
  
  async function sendNotificationWithRetry(notification, maxRetries = 3) {
    let attempt = 0;
    while (attempt < maxRetries) {
      try {
        attempt++;
        console.log(`📧 Attempt ${attempt} to send email to ${notification.email}`);
        await sendEmail(notification);
        console.log(`✅ Notification sent! Sent email to user ${notification.name}`);
        return;
      } catch (err) {
        console.error(`❌ Attempt ${attempt} failed: ${err.message}`);
        if (attempt === maxRetries) {
          console.error("❌ Max retry attempts reached. Giving up.");
          return;
        }
        // Wait before retrying (optional)
        await new Promise(res => setTimeout(res, 1000));
      }
    }
  }
  
  module.exports = {
    sendNotificationWithRetry,
  };