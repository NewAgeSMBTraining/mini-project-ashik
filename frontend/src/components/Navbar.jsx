import "./Navbar.css";
import { HashRouter as Router, Route, NavLink } from "react-router-dom";

import React from "react";
import AdminLogin from "./AdminLogin";
import EmployeLogin from "./EmployeLogin";

const Navbar = () => {
  return (
    <>
      <div className="body">
        <div>
          <h1 style={{ fontSize: "50px" }} data-text="Employee Management App">
            Employee Management App
          </h1>
          <h2>
            Admin<spam>⚡</spam>Employee
          </h2>
          <span className="links">
            <Router>
              <button>
                <NavLink
                  exact
                  to="/adminLogin"
                  className="navbar_links"
                  style={{ "text-decoration": "none", color: "orange" }}
                >
                  Admin Login
                </NavLink>
              </button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button>
                <NavLink
                  exact
                  to="/employeLogin"
                  className="navbar_links"
                  style={{ "text-decoration": "none", color: "orange" }}
                >
                  Employee Login
                </NavLink>
              </button>
              <Route exact path="/adminLogin">
                <AdminLogin />
              </Route>
              <Route exact path="/employeLogin">
                <EmployeLogin />
              </Route>
            </Router>
          </span>
        </div>
      </div>
    </>
  );
};

export default Navbar;
