import React from "react";
import { AppBar, Toolbar, IconButton, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function Navbar({ toggleSidebar }) {
  return (
    <AppBar position="static">
      <Toolbar>
        {/* Sidebar Toggle Button */}
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleSidebar}>
          <MenuIcon />
        </IconButton>
        {/* App Title */}
        <Box sx={{ flexGrow: 1, textAlign: "center", color: "#fff", fontWeight: "bold" }}>
          My App
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
