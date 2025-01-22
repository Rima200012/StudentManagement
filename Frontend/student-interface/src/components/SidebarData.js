import React from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
  },
  {
    title: "Students",
    path: "/students",
    icon: <IoIcons.IoIosPaper />,
  },
  {
    title: "Add Student",
    path: "/AddStudent",
    icon: <FaIcons.FaCartPlus />,
  },
];

function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <Drawer anchor="left" open={isOpen} onClose={toggleSidebar}>
      <Box sx={{ width: 250 }}>
        {/* Close Button */}
        <IconButton onClick={toggleSidebar} sx={{ margin: "8px" }}>
          <CloseIcon />
        </IconButton>
        {/* Navigation Links */}
        <List>
          {SidebarData.map((item, index) => (
            <ListItem button key={index} component={Link} to={item.path} onClick={toggleSidebar}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}

export default Sidebar;
