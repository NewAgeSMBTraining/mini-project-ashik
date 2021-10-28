/* eslint-disable no-restricted-globals */
import HTTP from "../config/Axios";

import "./EmployeHome.css";

import React, { useEffect, useState } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

const EmployeHome = (props) => {
  const history = useHistory();

  const [empDetails, setEmpDetails] = useState(props.location.props);
  useEffect(() => {
    if (empDetails.name) {
      setEmpDetails(props.location.props);
    } else {
      HTTP.get(`/myDetails/${empDetails._id}`)
        .then((data) => {
          setEmpDetails(data.data.user);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const logout = (e) => {
    confirm("Are you sure you want to log out ?");
    localStorage.removeItem("jwtToken");
    history.push("/");
  };

  return (
    <div>
      <Card
        className="text-center"
        style={{ width: "50rem", marginLeft: "230px", marginTop: "20px" }}
      >
        <Card.Header>Personal Details</Card.Header>
        <div>
          <Card.Img
            variant="top"
            style={{
              height: "10rem",
              width: "10rem",
              borderRadius: "80px",
              marginTop: "10px",
            }}
            src="https://static.vecteezy.com/system/resources/previews/000/423/286/original/avatar-icon-vector-illustration.jpg"
          />
        </div>
        <Card.Body>
          <Card.Title>{empDetails.name}</Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item>E-Mail : {empDetails.email}</ListGroup.Item>
            <ListGroup.Item>Date of Birth : {empDetails.dob}</ListGroup.Item>
            <ListGroup.Item>Gender : {empDetails.gender}</ListGroup.Item>
            <ListGroup.Item>
              {" "}
              Contact Number : {empDetails.contact}{" "}
            </ListGroup.Item>
            <ListGroup.Item> Address : {empDetails.address} </ListGroup.Item>
            <ListGroup.Item>
              {" "}
              Qualification : {empDetails.qualification}{" "}
            </ListGroup.Item>
            <ListGroup.Item>
              <div>
                {/* <button className="btns">Update Profile</button> */}
                <button className="btns">
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to={{
                      pathname: "/updateEmployee",
                      props: empDetails,
                    }}
                  >
                    Update
                  </Link>
                </button>
                <button className="btns">
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to={{
                      pathname: "/updatePassword",
                      props: empDetails,
                    }}
                  >
                    Reset Password
                  </Link>
                </button>
                <button className="btns">
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to={{
                      pathname: "/createLeave",
                      props: empDetails,
                    }}
                  >
                    Apply for Leave
                  </Link>
                </button>
                <button className="btns">
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to={{
                      pathname: "/getLeaves",
                      props: empDetails,
                    }}
                  >
                    Leaves
                  </Link>
                </button>
                <button className="logoutBtn" onClick={(e) => logout(e)}>
                  Logout
                </button>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  );
};

export default EmployeHome;
