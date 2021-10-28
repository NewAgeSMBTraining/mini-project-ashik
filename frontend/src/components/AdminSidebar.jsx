import React from "react";
import { Link } from "react-router-dom";
import "./AdminSidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar-wrapper">
      <nav id="sidebar">
        <ul className="list-unstyled components">
          <li>
            <Link to="/createUser"> Create Employee </Link>
          </li>
          <li>
            <Link to="/allUsers"> All Employees </Link>
          </li>
          <li>
            <Link to="/allLeaves"> View Leaves </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
