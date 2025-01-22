import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  Typography,
  Tooltip,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button
  
} from '@mui/material';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchBar from '../components/searchBar';
import  Notification  from '../components/notification';
import EmailModal from '../components/EmailModal';
import { useReactToPrint } from 'react-to-print';
import PrintIcon from '@mui/icons-material/Print';

const StudentsList = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [openDialog, setOpenDialog] = useState(false); // Dialog visibility state
  const [studentToDelete, setStudentToDelete] = useState(null); // Student to delete
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [openEmailModal, setOpenEmailModal] = useState(false); // Email modal state
  const [studentToEmail, setStudentToEmail] = useState(null); // Student to email
  const [notify, setNotify] = useState({isOpen: false, message:'', type:''});
  const componentPDF = useRef();


  // Fetch students from the API
  useEffect(() => {
    axios
      .get('http://localhost:3001/api/students')
      .then((response) => {
        console.log(response.data);
        setStudents(response.data); // Update the students state with the fetched data
        setFilteredStudents(response.data); // Initially, all students are displayed
      })
      .catch((error) => {
        console.error('Error fetching students:', error);
      });
  }, []);

  //generate PDF

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,

    
  })

  // Handle search input change
  const handleSearchChange = (value) => {
    setSearchValue(value);

    // Filter students based on multiple fields (id, name, email, phone)
    const filtered = students.filter((student) => {
      const searchLower = value.toLowerCase();
      return (
        student.id.toString().includes(searchLower) || // Check ID
        student.name.toLowerCase().includes(searchLower) || 
        student.email.toLowerCase().includes(searchLower) || 
        (student.phone && student.phone.toString().includes(searchLower)) || 
        (student.age && student.age.toString().includes(searchLower))
      );
    });
    setFilteredStudents(filtered);
  };

  // Clear the search bar
  const handleClearSearch = () => {
    setSearchValue('');
    setFilteredStudents(students);
  };
  // Handle email sending
  const handleEmail = () => {
    if (studentToEmail) {
      axios
        .post('http://localhost:3001/api/send-email', {
          recipientEmail: studentToEmail.email,
          subject,
          description
        })
        .then(() => {
          setNotify({
            isOpen: true,
            message: 'Email sent successfully!',
            type: 'success'
          });
          setOpenEmailModal(false); // Close the email modal
        })
        .catch((error) => {
          setNotify({
            isOpen: true,
            message: 'Error sending email',
            type: 'error'
          });
          console.error('Error sending email:', error);
        });
    }
  };


  // Handle delete action
  const handleDelete = () => {
    if (studentToDelete) {
      axios
        .delete(`http://localhost:3001/api/students/${studentToDelete.id}`)
        .then(() => {
          const updatedStudents = students.filter(
            (student) => student.id !== studentToDelete.id
          );
          setStudents(updatedStudents);
          setFilteredStudents(updatedStudents);
          setOpenDialog(false); // Close dialog after deletion
          setNotify({
            isOpen: true,
            message: 'Student deleted successfully',
            type: 'success'
          })

        })
        .catch((error) => console.error('Error deleting student:', error));
    }
  };

  // Open confirmation dialog
  const openDeleteDialog = (student) => {
    setStudentToDelete(student); // Set the student to be deleted
    setOpenDialog(true); // Open the dialog
  };

  // Close confirmation dialog
  const closeDeleteDialog = () => {
    setOpenDialog(false); // Close the dialog without deleting
  };


  // Open email modal
  const openEmailModalDialog = (student) => {
    setStudentToEmail(student); // Set the student to email
    setOpenEmailModal(true); // Open the email modal
  };

  const downloadPdf = () => {

  }

  return (
    <Box sx={{ padding: 3 }}>
      {/* Search Bar */}
      <SearchBar
        value={searchValue}
        onChange={handleSearchChange}
        onClear={handleClearSearch}
      />
      {/* <MaterialTable 
          title="Student details"
          columns = {columns}
          data = {studentData}
          Actions = {[
            {
              icon: () => <PrintIcon />,
              tooltip: "Export to PDF",
              onClick: () => downloadPdf(),
              isFreeAction: true

            }
          ]}
      
      
      
      /> */}

      {/* Table */}
      <TableContainer component={Paper} sx={{ marginTop: 4, borderRadius: 2, boxShadow: 3 }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ padding: 2, backgroundColor: '#f5f5f5', fontWeight: 'bold' }}
        >
          Students List
        </Typography>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#e0e0e0' }}>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}>
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.age}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.phone}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Update">
                    <IconButton
                      component={Link}
                      to={`/update/${student.id}`}
                      color="primary"
                      sx={{ marginRight: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton color="error" onClick={() => openDeleteDialog(student)}>
                      <DeleteIcon />
                    </IconButton>
                    </Tooltip>
                  <Tooltip title="Send Email">
                    <IconButton color="primary" onClick={() => openEmailModalDialog(student)}>
                      {/* <EmailIcon /> You can replace with an email icon */}
                    </IconButton>
                  
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={closeDeleteDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Do you want to remove this student?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            No
          </Button>
          <Button onClick={handleDelete} color="error">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <EmailModal
        open={openEmailModal}
        onClose={() => setOpenEmailModal(false)}
        onSubmit={handleEmail}
        subject={subject}
        setSubject={setSubject}
        description={description}
        setDescription={setDescription}
      />
      <Notification
        notify = {notify}
        setNotify = { setNotify } />
    </Box>
  );
};

export default StudentsList;