import "./AdminRegister.css";
import { Button, Form } from "react-bootstrap";
import HTTP from "../config/Axios";
import React, { useState } from "react";
import { useHistory } from "react-router";

const AdminRegister = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const history = useHistory();

  const url = "/adminRegister";

  function submitData(e) {
    e.preventDefault();

    HTTP.post(url, {
      email: data.email,
      password: data.password,
    })
      .then((res) => {
        localStorage.setItem("jwtToken", res.data.token);
        alert("Admin account Added Successfully");
        history.push("/allUsers");
      })
      .catch((err) => {
        alert("Adding Failed");
      });
  }

  function handleChange(e) {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
    console.log(newData);
  }

  return (
    <div className="container">
      <Form className="form" onSubmit={(e) => submitData(e)}>
        <h4>Admin Registration</h4>
        <br />
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter  Email"
            id="email"
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter  Password"
            id="password"
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>

        <br />
        <Button type="submit">Add</Button>
      </Form>
    </div>
  );
};

export default AdminRegister;
