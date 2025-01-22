const express = require('express');
const router = express.Router();
const { sendEmail } = require('../controllers/SendemailController'); 

// Route to send email
router.post('/sendEmail', (req, res) => {
  const { recipientEmail, subject, description } = req.body;

  const result = sendEmail(recipientEmail, subject, description);
  
  if (result.success) {
    res.status(200).json({ message: 'Email sent successfully!' });
  } else {
    res.status(500).json({ message: 'Error sending email' });
  }
});

module.exports = router;
