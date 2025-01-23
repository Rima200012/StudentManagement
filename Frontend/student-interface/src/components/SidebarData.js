import React from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
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

function PrimeSidebar({ isOpen, toggleSidebar }) {
  return (
    <Sidebar visible={isOpen} onHide={toggleSidebar} style={{ width: "250px" }}>
      {/* Close Button */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "1rem",
        }}
      >
        {/* <Button
          icon="pi pi-times"
          className="p-button-text"
          onClick={toggleSidebar}
          aria-label="Close Sidebar"
        /> */}
      </div>

      {/* Navigation Links */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {SidebarData.map((item, index) => (
          <li key={index} style={{ marginBottom: "1rem" }}>
            <Link
              to={item.path}
              onClick={toggleSidebar}
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
                gap: "0.5rem",
              }}
            >
              <span style={{ fontSize: "1.5rem" }}>{item.icon}</span>
              <span>{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Sidebar>
  );
}

export default PrimeSidebar;
