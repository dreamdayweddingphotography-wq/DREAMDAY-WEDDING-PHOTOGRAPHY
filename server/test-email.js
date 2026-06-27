require('dotenv').config();
const nodemailer = require('nodemailer');

async function testEmail() {
  const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'dreamdayweddingphotography@gmail.com',
        pass: 'omwwpedwgxatifdg'
      },
      tls: {
        rejectUnauthorized: false
      }
    });

  try {
    const info = await transporter.sendMail({
      from: 'dreamdayweddingphotography@gmail.com',
      to: 'dreamdayweddingphotography@gmail.com',
      subject: 'Test Email from Node.js',
      text: 'This is a test email to verify credentials.'
    });
    console.log('Email sent successfully:', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error.message);
  }
}

testEmail();
