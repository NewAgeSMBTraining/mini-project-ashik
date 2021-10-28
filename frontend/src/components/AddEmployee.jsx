import "./AddEmployee.css";
import { Button, Form } from "react-bootstrap";
import HTTP from "../config/Axios";
import React, { useState } from "react";
import { useHistory } from "react-router";

const AddEmployee = () => {
  const [data, setData] = useState({
    name: "",
    dob: "",
    contact: "",
    address: "",
    qualification: "",
    gender: "",
    email: "",
    password: "",
  });

  const history = useHistory();

  const url = "/createUser";

  function submitData(e) {
    e.preventDefault();

    HTTP.post(url, {
      name: data.name,
      dob: data.dob,
      contact: data.contact,
      address: data.address,
      experience: data.experience,
      qualification: data.qualification,
      gender: data.gender,
      email: data.email,
      password: data.password,
    })
      .then((res) => {
        alert("Employee Added Successfully");
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
    <div>
      <Form className="form" onSubmit={(e) => submitData(e)}>
        <h4>Add Employee Form</h4>
        <br />
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Full Name"
            id="name"
            value={data.name}
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>

        <Form.Group controlId="dob">
          <Form.Label>Date Of Birth</Form.Label>
          <Form.Control
            type="date"
            placeholder="date"
            id="dob"
            value={data.dob}
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>

        <Form.Group controlId="gender">
          <Form.Label>Gender</Form.Label>
          <Form.Select
            defaultValue="Choose..."
            onChange={(e) => handleChange(e)}
            id="gender"
            value={data.gender}
          >
            <option>Choose...</option>
            <option>Male</option>
            <option>Female</option>
            <option>Transgender</option>
          </Form.Select>
        </Form.Group>
        <br />

        <Form.Group controlId="contact">
          <Form.Label>Contact Number</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Contact Number"
            id="contact"
            value={data.contact}
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>

        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Apartment No, floor.."
            id="address"
            value={data.address}
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>

        <Form.Group controlId="qualification">
          <Form.Label>Highest Qualification</Form.Label>
          <Form.Select
            defaultValue="Choose..."
            onChange={(e) => handleChange(e)}
            id="qualification"
            value={data.qualification}
          >
            <option>Choose...</option>
            <option value="SSLC">SSLC</option>
            <option value="HSC">HSC</option>
            <option value="Graduation">Graduation</option>
            <option value="Post-Graduation">Post-Graduation</option>
          </Form.Select>
        </Form.Group>
        <br />

        <Form.Group controlId="experience">
          <Form.Label>Work Experience(Years)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Work Experience"
            id="experience"
            value={data.experience}
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email of employee"
            id="email"
            value={data.email}
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password of employee"
            id="password"
            value={data.password}
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>

        <br />
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
};

export default AddEmployee;
