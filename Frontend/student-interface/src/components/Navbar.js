import React from "react";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";

function Navbar({ toggleSidebar }) {
  const items = [
    {
      icon: "pi pi-bars",
      command: toggleSidebar, // Toggle sidebar
    },
  ];

  return (
    <div className="card" style={{ marginBottom: "20px" }}>
      <Menubar
        model={items}
        // start={<Button icon="pi pi-bars" className="p-button-text" />}
        end={<span style={{ fontWeight: "bold", color: "#fff" }}></span>}
        style={{
          backgroundColor: "#1976d2", // Primary color
          color: "#fff",
          borderRadius: "8px", // Rounded corners
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Subtle shadow
        }}
      />
    </div>
  );
}

export default Navbar;
