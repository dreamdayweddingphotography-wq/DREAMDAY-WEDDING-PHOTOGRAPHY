const axios = require('axios');

/**
 * Notification Service
 * Handles sending notifications via WhatsApp, Instagram, and internal systems.
 */
class NotificationService {
  /**
   * Send WhatsApp notification
   * In a real production app, you'd use Twilio WhatsApp API or similar.
   */
  async sendWhatsAppNotification(booking) {
    console.log(`[WhatsApp Notification] Sending to admin: New booking from ${booking.name} for ${booking.eventType} on ${booking.date}`);
    
    // Example: Integration with a placeholder API
    // const response = await axios.post('https://api.whatsapp-service.com/send', {
    //   to: process.env.ADMIN_WHATSAPP_NUMBER,
    //   message: `New Booking Request!\nName: ${booking.name}\nEvent: ${booking.eventType}\nDate: ${booking.date}`
    // });
    
    return true;
  }

  /**
   * Send Instagram notification
   * Instagram doesn't have a direct "DM from API" without complex business setup.
   * Usually, this would be an internal trigger that might alert an Instagram bot or send an email that the admin sees.
   */
  async sendInstagramNotification(booking) {
    console.log(`[Instagram Notification] Triggering alert for Instagram: New booking from ${booking.name}`);
    
    // This is often handled via a webhook or a specific social media management API
    return true;
  }

  /**
   * Trigger general notification (e.g. Email / Push)
   */
  async triggerGeneralNotification(booking) {
    console.log(`[General Notification] Internal system alert: New booking ID ${booking._id}`);
    return true;
  }

  /**
   * Master function to send all notifications
   */
  async notifyAll(booking) {
    try {
      await Promise.all([
        this.sendWhatsAppNotification(booking),
        this.sendInstagramNotification(booking),
        this.triggerGeneralNotification(booking)
      ]);
      return true;
    } catch (error) {
      console.error('Error sending notifications:', error);
      return false;
    }
  }
}

module.exports = new NotificationService();
