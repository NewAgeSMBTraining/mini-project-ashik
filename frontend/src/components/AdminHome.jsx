/* eslint-disable no-restricted-globals */
import "./AdminHome.css";
import React, { useEffect, useState } from "react";
import HTTP from "../config/Axios";
import { useHistory } from "react-router";
import AdminSidebar from "./AdminSidebar";
import { MDBDataTable } from "mdbreact";

import { NavLink, Link } from "react-router-dom";

const AdminHome = (props) => {
  const [employees, setEmployees] = useState("");
  const history = useHistory();

  useEffect(() => {
    const url = "/allEmployees";
    HTTP.get(url).then((res) => {
      setEmployees(res.data.users);
    });
  }, []);

  // Block Employee
  const blockEmployee = (id) => {
    const url = `/blockEmployee/${id}`;
    HTTP.post(url)
      .then((data) => {
        alert("Success");
        // history.push("/allUsers");
        window.location.reload();
      })
      .catch((err) => {
        alert("Failed");
      });
  };

  // Delete Employee
  const deleteEmployee = (id) => {
    const url = `/deleteUser/${id}`;
    HTTP.delete(url).then((result) => {
      alert("Deleted");
      window.location.reload();
    });
  };

  // Logout
  const logout = (e) => {
    confirm("Are you sure you want to log out ?");
    localStorage.removeItem("jwtToken");
    history.push("/");
  };

  const setDatas = () => {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Email",
          field: "email",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    employees &&
      employees.forEach((employee, index) => {
        data.rows.push({
          id: employee._id,
          name: employee.name,
          email: employee.email,
          actions: (
            <>
              <tr key={index}>
                <td>
                  <button className="linkBtns">
                    <NavLink
                      exact
                      style={{ textDecoration: "none", color: "white" }}
                      to={{
                        pathname: "/getAnEmployee",
                        props: employee,
                      }}
                    >
                      More
                    </NavLink>
                  </button>
                </td>
                <td>
                  <button className="linkBtns">
                    <Link
                      style={{ textDecoration: "none", color: "white" }}
                      to={{
                        pathname: "/updateUser",
                        props: employee,
                      }}
                    >
                      Update
                    </Link>
                  </button>
                  <button
                    className="linkBtns"
                    onClick={() => deleteEmployee(employee._id)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    className="bbtns"
                    onClick={() => blockEmployee(employee._id)}
                  >
                    {employee.block === true ? "Unblock" : "Block"}
                  </button>
                </td>
              </tr>
            </>
          ),
        });
      });

    return data;
  };

  return (
    <>
      <div className="row">
        <div className="col-12 col-md-2">
          <h4>
            <AdminSidebar />
          </h4>
        </div>
        <div className="col-12 col-md-10 ">
          <>
            <h3 className="my-5" style={{ textAlign: "center" }}>
              All Employees
            </h3>
            <div>
              <button className="loBtn" onClick={(e) => logout(e)}>
                Logout
              </button>
              <button className="pwBtn">
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to={{
                    pathname: "/updatePassword",
                    props: props.location.props,
                  }}
                >
                  Update Password
                </Link>
              </button>
            </div>
            <MDBDataTable
              data={setDatas()}
              className="px-3 "
              bordered
              striped
              hover
              info={false}
              paging={false}
            />
          </>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
