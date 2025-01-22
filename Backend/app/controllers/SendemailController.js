const nodemailer = require('nodemailer');

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',  
  auth: {
    user: process.env.EMAIL_USER,  
    pass: process.env.EMAIL_PASS,  
  },
});

// Function to send the email
const sendEmail = (recipientEmail, subject, description) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,  
    to: recipientEmail,            
    subject: subject,
    text: description,             
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
      return { success: false, message: 'Error sending email' };
    } else {
      console.log('Email sent: ' + info.response);
      return { success: true, message: 'Email sent successfully!' };
    }
  });
};

module.exports = { sendEmail };
