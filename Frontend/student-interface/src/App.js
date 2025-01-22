import React, { useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import StudentsList from './Pages/StudentsList';
import UpdateStudent from './Pages/Updatestudent';
import AddStudent from './Pages/AddStudent';
import Navbar from './components/Navbar';
import Sidebar from './components/SidebarData';



const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <Router>
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/students" element={<StudentsList />} />
          <Route path="/update/:id" element={<UpdateStudent />} />
          <Route path="/AddStudent" element={<AddStudent />} />
        </Routes>
      
    </Router>
  );
};

export default App;
