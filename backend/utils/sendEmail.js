const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // Create a transporter
    // For production, use a real SMTP service (SendGrid, Mailgun, Amazon SES, etc.)
    // For development, we can use Ethereal (https://ethereal.email) or just log it if no env vars.

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.ethereal.email',
        port: process.env.SMTP_PORT || 587,
        auth: {
            user: process.env.SMTP_EMAIL || 'demo@ethereal.email', // Replace with real/test credentials
            pass: process.env.SMTP_PASSWORD || 'password'
        }
    });

    const message = {
        from: `${process.env.FROM_NAME || 'JobPortal'} <${process.env.FROM_EMAIL || 'noreply@jobportal.com'}>`,
        to: options.email,
        subject: options.subject,
        html: options.message
    };

    const info = await transporter.sendMail(message);

    console.log(`Message sent: ${info.messageId}`);
    if (process.env.NODE_ENV !== 'production') {
        console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
    }
};

module.exports = sendEmail;
