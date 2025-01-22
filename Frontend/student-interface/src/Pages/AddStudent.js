import React, { useState} from "react";
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from '@mui/material';
import Notification from "../components/notification";




const StudentRegistration = () => {

    
    const { register, formState:{errors}, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [notify, setNotify] = useState({isOpen: false, message:'', type:''});
    
    const onSubmit = (data) => {
        axios.post('http://localhost:3001/api/students', data) 
          .then(response => {
            console.log('Form Data Submitted:', response.data);
            //alert('Student Registered Successfully!');
            navigate('/students');
            setNotify({
              isOpen: true,
              message: 'Student Registered successfully',
              type: 'success'
            });
          })
          
          .catch((error) => {
            console.error('Error registering student:', error);
            setNotify({
                isOpen: true,
                message: 'Error registering student',
                type: 'error'
            });
          });
    };
    return (
        <Box
          sx={{
            maxWidth: 500,
            margin: '50px auto',
            padding: 3,
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: 'white',
          }}
        >
          <Typography variant="h4" gutterBottom align="center">
            Student Registration
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name Field */}
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              margin="normal"
              {...register('name', { required: 'Name is required' })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
    
            {/* Age Field */}
            <TextField
              fullWidth
              label="Age"
              type="number"
              variant="outlined"
              margin="normal"
              {...register('age', {
                required: 'Age is required',
                min: { value: 1, message: 'Age must be at least 1' },
              })}
              error={!!errors.age}
              helperText={errors.age?.message}
            />
    
            {/* Email Field */}
            <TextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              margin="normal"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'Invalid email address',
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
    
            {/* Phone Field */}
            <TextField
              fullWidth
              label="Phone"
              type="tel"
              variant="outlined"
              margin="normal"
              {...register('phone', {
                required: 'Phone number is required',
                pattern: {
                  value: /^[0-9]{8,15}$/,
                  message: 'Phone number must be 8-15 digits',
                },
              })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
    
            {/* Submit Button */}
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              sx={{ marginTop: 2 }}
            >
              Register
            </Button>
          </form>
          <Notification
                  notify = {notify}
                  setNotify = { setNotify } />
        </Box>
      );
    

   
    
};

export default StudentRegistration;



