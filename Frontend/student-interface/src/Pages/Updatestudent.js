import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Container } from '@mui/material';

function UpdateStudent() {
  const { id } = useParams(); // Get the student ID from the URL
  const navigate = useNavigate();
  
  const [student, setStudent] = useState({
    name: '',
    age: '',
    email: '',
    phone: '',
  });

  // Fetch student data 
  useEffect(() => {
    axios.get(`http://localhost:3001/api/students/${id}`)
      .then(response => {
        setStudent(response.data); 
      })
      .catch(error => {
        console.error('Error fetching student:', error);
      });
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/api/students/${id}`, student)
      .then(response => {
        console.log('Student updated:', response.data);
        navigate('/StudentsList'); // Redirect to the student list page after updating
      })
      .catch(error => {
        console.error('Error updating student:', error);
      });
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Update Student
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            name="name"
            value={student.name}
            onChange={handleChange}
          />
          <TextField
            label="Age"
            variant="outlined"
            fullWidth
            margin="normal"
            type="number"
            name="age"
            value={student.age}
            onChange={handleChange}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            type="email"
            name="email"
            value={student.email}
            onChange={handleChange}
          />
          <TextField
            label="Phone"
            variant="outlined"
            fullWidth
            margin="normal"
            name="phone"
            value={student.phone}
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Update Student
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default UpdateStudent;
