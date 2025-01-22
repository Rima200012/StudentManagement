import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

const EmailModal = ({ open, onClose, studentEmail }) => {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');

  const handleSendEmail = () => {
    const emailData = {
      recipientEmail: studentEmail,
      subject: subject,
      description: description,
    };

    axios
      .post('http://localhost:3001/api/sendEmail', emailData)
      .then((response) => {
        console.log('Email sent:', response.data);
        onClose();  // Close the modal after sending the email
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" gutterBottom>
          Send Email to Student
        </Typography>
        <TextField
          fullWidth
          label="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={4}
          sx={{ marginBottom: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleSendEmail}>
          Send Email
        </Button>
      </Box>
    </Modal>
  );
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  padding: 4,
  borderRadius: 2,
  boxShadow: 24,
};

export default EmailModal;
