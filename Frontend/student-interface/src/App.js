import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import StudentsList from './Pages/StudentsList';
import UpdateStudent from './Pages/Updatestudent';
import AddStudent from './Pages/AddStudent';
import Navbar from './components/Navbar';
import PrimeSidebar from './components/SidebarData';
import Login from './Pages/login';
import Signup from './Pages/signup';
import NotFound from './Pages/NotFound';
import 'react-toastify/dist/ReactToastify.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';  // Choose the theme you prefer
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      {/* Navbar with sidebar toggle */}
      <Navbar toggleSidebar={toggleSidebar} />
      
      {/* Sidebar with dynamic visibility */}
      <PrimeSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Routes */}
      <div style={{ marginLeft: isSidebarOpen ? '250px' : '0', transition: 'margin-left 0.3s ease' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/students" element={<StudentsList />} />
          <Route path="/update/:id" element={<UpdateStudent />} />
          <Route path="/AddStudent" element={<AddStudent />} />
          <Route path="*" element={<NotFound />} />
          
        </Routes>
      </div>
    </Router>
  );
};

export default App;
