const nodemailer = require('nodemailer');

/**
 * Notification Service
 * Handles sending notifications via WhatsApp, Instagram, and internal systems.
 */
class NotificationService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  }
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
    
    // Check if email is configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('Email credentials missing, skipping email notification.');
      return false;
    }

    try {
      const htmlTemplate = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8f7f4; padding: 40px; border-radius: 12px; border: 1px solid #e0dcd3;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="font-family: 'Georgia', serif; color: #1a1a1a; margin: 0; font-size: 28px;">New Booking Inquiry</h1>
            <p style="color: #b38a1a; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin-top: 8px;">DREAMDAY WEDDING PHOTOGRAPHY</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.03);">
            <h2 style="font-size: 16px; color: #333; margin-top: 0; border-bottom: 1px solid #eee; padding-bottom: 10px;">Client Details</h2>
            <p style="margin: 8px 0; font-size: 14px;"><strong style="color: #666; width: 100px; display: inline-block;">Name:</strong> <span style="color: #111;">${booking.name}</span></p>
            <p style="margin: 8px 0; font-size: 14px;"><strong style="color: #666; width: 100px; display: inline-block;">Email:</strong> <span style="color: #111;">${booking.email}</span></p>
            <p style="margin: 8px 0; font-size: 14px;"><strong style="color: #666; width: 100px; display: inline-block;">Phone:</strong> <span style="color: #111;">${booking.phone}</span></p>
            
            <h2 style="font-size: 16px; color: #333; margin-top: 30px; border-bottom: 1px solid #eee; padding-bottom: 10px;">Event Information</h2>
            <p style="margin: 8px 0; font-size: 14px;"><strong style="color: #666; width: 100px; display: inline-block;">Event Type:</strong> <span style="color: #111;">${booking.eventType}</span></p>
            <p style="margin: 8px 0; font-size: 14px;"><strong style="color: #666; width: 100px; display: inline-block;">Date:</strong> <span style="color: #111;">${new Date(booking.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span></p>
            <p style="margin: 8px 0; font-size: 14px;"><strong style="color: #666; width: 100px; display: inline-block;">Location:</strong> <span style="color: #111;">${booking.location}</span></p>
          </div>

          <div style="text-align: center; margin-top: 40px;">
            <a href="mailto:${booking.email}" style="background-color: #b38a1a; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 14px; display: inline-block;">Reply to Client</a>
          </div>
          
          <p style="text-align: center; font-size: 12px; color: #999; margin-top: 40px;">
            This is an automated message from your website booking form.<br>
            Please log in to your admin dashboard to manage all inquiries.
          </p>
        </div>
      `;

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'dreamdayweddingphotography@gmail.com',
        subject: `New Inquiry: ${booking.eventType} from ${booking.name}`,
        html: htmlTemplate
      };

      await this.transporter.sendMail(mailOptions);
      console.log('[Email Notification] Successfully sent email to dreamdayweddingphotography@gmail.com');
      return true;
    } catch (error) {
      console.error('[Email Notification] Error sending email:', error);
      return false;
    }
  }

  /**
   * Send a beautiful confirmation email to the client
   */
  async sendClientConfirmationEmail(booking) {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !booking.email) return false;

    try {
      const clientHtmlTemplate = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0f0d09; padding: 40px; border-radius: 12px; color: #f0ead8;">
          <div style="text-align: center; margin-bottom: 40px;">
            <h1 style="font-family: 'Georgia', serif; font-weight: normal; font-style: italic; color: #c8a165; margin: 0; font-size: 32px;">Dream Day</h1>
            <p style="color: #c8a165; font-size: 10px; text-transform: uppercase; letter-spacing: 4px; margin-top: 8px;">Wedding Photography</p>
          </div>
          
          <div style="padding: 20px 10px;">
            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">Dear ${booking.name},</p>
            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">Thank you so much for reaching out to us. We have received your inquiry for your upcoming ${booking.eventType} on ${new Date(booking.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} at ${booking.location}.</p>
            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 30px;">Our team is currently reviewing your details. We will get back to you shortly with our availability, pricing, and next steps to capture your beautiful moments.</p>
            
            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 5px; color: #c8a165; font-style: italic;">Warm regards,</p>
            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 0;">The Dream Day Team</p>
          </div>

          <div style="text-align: center; margin-top: 50px; border-top: 1px solid rgba(200, 161, 101, 0.2); padding-top: 30px;">
            <p style="font-size: 12px; color: #888;">If you have any immediate questions, feel free to reply directly to this email.</p>
          </div>
        </div>
      `;

      const mailOptions = {
        from: `"Dream Day Photography" <${process.env.EMAIL_USER}>`,
        to: booking.email,
        subject: `We've Received Your Inquiry, ${booking.name} - Dream Day Photography`,
        html: clientHtmlTemplate
      };

      await this.transporter.sendMail(mailOptions);
      console.log(`[Email Notification] Successfully sent confirmation email to client: ${booking.email}`);
      return true;
    } catch (error) {
      console.error('[Email Notification] Error sending client confirmation email:', error);
      return false;
    }
  }

  /**
   * Master function to send all notifications
   */
  async notifyAll(booking) {
    try {
      await Promise.all([
        this.sendWhatsAppNotification(booking),
        this.sendInstagramNotification(booking),
        this.triggerGeneralNotification(booking),
        this.sendClientConfirmationEmail(booking)
      ]);
      return true;
    } catch (error) {
      console.error('Error sending notifications:', error);
      return false;
    }
  }
}

module.exports = new NotificationService();
