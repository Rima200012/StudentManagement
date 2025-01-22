import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import { Navigate, useNavigate } from 'react-router-dom';

const StudentsList = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [openEmailModal, setOpenEmailModal] = useState(false);
  const [studentToEmail, setStudentToEmail] = useState(null);
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const [selectedStudents, setSelectedStudents] = useState([]); // State pour les étudiants sélectionnés


  // Fetch students
  useEffect(() => {
    axios
      .get('http://localhost:3001/api/students')
      .then((response) => {
        setStudents(response.data);
        setFilteredStudents(response.data);
      })
      .catch((error) => console.error('Error fetching students:', error));
  }, []);

  // Handle search
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    const filtered = students.filter((student) =>
      ['id', 'name', 'email', 'phone', 'age'].some((key) =>
        student[key]?.toString().toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredStudents(filtered);
  };

  const handleClearSearch = () => {
    setSearchValue('');
    setFilteredStudents(students);
  };

  // Export to PDF
  const exportPdf = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['ID', 'Name', 'Age', 'Email', 'Phone']],
      body: filteredStudents.map(({ id, name, age, email, phone }) => [
        id,
        name,
        age,
        email,
        phone,
      ]),
    });
    doc.save('students.pdf');
  };

  // Function to export a single student's data as a PDF
 const exportStudentPdf = (student) => {
  const doc = new jsPDF();
  doc.text(`Student Details`, 10, 10);
  doc.text(`ID: ${student.id}`, 10, 20);
  doc.text(`Name: ${student.name}`, 10, 30);
  doc.text(`Age: ${student.age}`, 10, 40);
  doc.text(`Email: ${student.email}`, 10, 50);
  doc.text(`Phone: ${student.phone}`, 10, 60);
  doc.save(`${student.name}_details.pdf`);
 };

 // Nouvelle fonction pour exporter les étudiants sélectionnés
 const exportSelectedPdf = () => {
  if (selectedStudents.length === 0) {
    alert('Veuillez sélectionner des étudiants à exporter');
    return;
  }

  const doc = new jsPDF();
  doc.autoTable({
    head: [['ID', 'Name', 'Age', 'Email', 'Phone']],
    body: selectedStudents.map(({ id, name, age, email, phone }) => [
      id,
      name,
      age,
      email,
      phone,
    ]),
  });
  doc.save('students_selected.pdf');
 };

  // Handle delete
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
          setOpenDialog(false);
        })
        .catch((error) => console.error('Error deleting student:', error));
    }
  };

  const openDeleteDialog = (student) => {
    setStudentToDelete(student);
    setOpenDialog(true);
  };

  // Dialog footer for delete confirmation
  const deleteDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => setOpenDialog(false)}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-danger"
        onClick={handleDelete}
      />
    </>
  );
  const openEmailModalDialog = (student) => {
    console.log('Opening email modal for:', student);
    // Add email modal logic
  };
  

  return (
    <div className="students-list">
      <h2>Students List</h2>
      <div className="p-inputgroup" style={{ marginBottom: '1rem' }}>
        {/* Search Bar */}
        <InputText
          value={searchValue} // Bind the state to the input
          onChange={handleSearchChange} // Update the state on change
          placeholder="Search by ID, Name, Email, etc."
        />
        {/* Clear Button */}
        <Button icon="pi pi-times" onClick={handleClearSearch} />
        {/* Export PDF Button */}
        <Button
          icon="pi pi-file-pdf" // Icon for PDF export
          className="p-button-rounded p-button-warning p-button-text" // Matches the "X" button styling
          onClick={exportPdf}
          tooltip="Export PDF" // Tooltip for accessibility
          tooltipOptions={{ position: 'top' }} // Optional: Tooltip position
        />
        {/* Bouton Export PDF des étudiants sélectionnés */}
        <Button
                icon="pi pi-file-pdf"
                className="p-button-rounded p-button-info p-button-text"
                onClick={exportSelectedPdf} // Nouvelle fonction pour les étudiants sélectionnés
                tooltip="Exporter PDF des étudiants sélectionnés"
                tooltipOptions={{ position: 'top' }}
              />

      </div>

      <DataTable
       value={filteredStudents || []} paginator rows={10} responsiveLayout="scroll" selection={selectedStudents} onSelectionChange={(e) => setSelectedStudents(e.value)} dataKey="id" >
        <Column selectionMode="multiple" style={{ width: '3em' }} /> {/* Colonne de sélection */}

        <Column field="id" header="id" sortable />
        <Column field="name" header="Name" sortable />
        <Column field="age" header="Age" sortable />
        <Column field="email" header="Email" sortable />
        <Column field="phone" header="Phone" sortable />
        <Column
          header="Actions"
          body={(student) => (
            <div className="actions">
              {/* Update Button */}
              <Button
                icon="pi pi-pencil"
                className="p-button-rounded p-button-primary p-button-text"
                tooltip="Update"
                onClick={() => navigate(`/update/${student.id}`)}
              />

              {/* Delete Button */}
              <Button
                icon="pi pi-trash"
                className="p-button-rounded p-button-danger p-button-text"
                tooltip="Delete"
                onClick={() => openDeleteDialog(student)}
              />

              {/* Send Email Button */}
              <Button
                icon="pi pi-envelope"
                className="p-button-rounded p-button-success p-button-text"
                tooltip="Send Email"
                onClick={() => openEmailModalDialog(student)}
              />
               {/* Export Student PDF Button */}
              <Button
                icon="pi pi-file-pdf"
                className="p-button-rounded p-button-warning p-button-text"
                tooltip="Export PDF"
                onClick={() => exportStudentPdf(student)}
              />
              
            </div>
          )}
        />
      </DataTable>

      <Dialog
        visible={openDialog}
        style={{ width: '350px' }}
        header="Confirm Deletion"
        modal
        footer={deleteDialogFooter}
        onHide={() => setOpenDialog(false)}
      >
        <p>Are you sure you want to delete this student?</p>
      </Dialog>
    </div>
  );
};

export default StudentsList;