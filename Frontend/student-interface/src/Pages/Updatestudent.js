import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Messages } from 'primereact/messages';

function UpdateStudent() {
  const { id } = useParams(); // Get the student ID from the URL
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    name: '',
    age: '',
    email: '',
    phone: '',
  });

  const [messages, setMessages] = useState(null);

  const messagesRef = React.useRef(null);

  // Fetch student data
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/students/${id}`)
      .then((response) => {
        setStudent(response.data);
      })
      .catch((error) => {
        console.error('Error fetching student:', error);
        setMessages([{ severity: 'error', summary: 'Error', detail: 'Failed to fetch student data' }]);
      });
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3001/api/students/${id}`, student)
      .then((response) => {
        console.log('Student updated:', response.data);
        if (messagesRef.current) {
          messagesRef.current.show([
            { severity: 'success', summary: 'Success', detail: 'Student updated successfully!' },
          ]);
        }
        setTimeout(() => {
          navigate('/students'); // Redirect to the student list page after a short delay
        }, 2000); // 2-second delay
      })
      .catch((error) => {
        console.error('Error updating student:', error);
        setMessages([{ severity: 'error', summary: 'Error', detail: 'Failed to update student data' }]);
      });
  };

  return (
    <div className="update-student">
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
    <Messages
      ref={messagesRef}
      style={{
        maxWidth: '300px', // Adjust the width of the message box
        textAlign: 'center', // Center-align the text inside the message box
      }}
    />
    </div>
      <Card title="Update Student" className="p-shadow-4" style={{ maxWidth: '400px', margin: '2rem auto' }}>
        
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <div style={{ width: '100%' }}>
            <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem' }}>
              Name
            </label>
            <InputText
              id="name"
              name="name"
              value={student.name}
              onChange={handleChange}
              placeholder="Enter student name"
              required
              style={{ width: '100%' }}
            />
          </div>
          <div style={{ width: '100%' }}>
            <label htmlFor="age" style={{ display: 'block', marginBottom: '0.5rem' }}>
              Age
            </label>
            <InputText
              id="age"
              name="age"
              value={student.age}
              onChange={handleChange}
              placeholder="Enter student age"
              required
              type="number"
              style={{ width: '100%' }}
            />
          </div>
          <div style={{ width: '100%' }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem' }}>
              Email
            </label>
            <InputText
              id="email"
              name="email"
              value={student.email}
              onChange={handleChange}
              placeholder="Enter student email"
              required
              type="email"
              style={{ width: '100%' }}
            />
          </div>
          <div style={{ width: '100%' }}>
            <label htmlFor="phone" style={{ display: 'block', marginBottom: '0.5rem' }}>
              Phone
            </label>
            <InputText
              id="phone"
              name="phone"
              value={student.phone}
              onChange={handleChange}
              placeholder="Enter student phone number"
              required
              style={{ width: '100%' }}
            />
          </div>
          <Button label="Update Student" icon="pi pi-check" className="p-button-primary" type="submit" />
        </form>
      </Card>
    </div>
  );
}

export default UpdateStudent;
