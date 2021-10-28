import "./EditEmployee.css";
import { Button, Form } from "react-bootstrap";
import React, { useState } from "react";
import HTTP from "../config/Axios";
import { useHistory } from "react-router";

const EditEmployee = (props) => {
  const history = useHistory();

  const [data, setData] = useState({
    name: props.location.props.name,
    dob: props.location.props.dob,
    gender: props.location.props.gender,
    address: props.location.props.address,
    contact: props.location.props.contact,
    education: props.location.props.qualification,
    workExperience: props.location.props.experience,
    email: props.location.props.email,
  });

  const url = `/updateUser/${props.location.props._id}`;

  function submitData(e) {
    e.preventDefault();

    HTTP.put(url, data)
      .then((data) => {
        alert("User Data Updated");
        //Redirect("/allUsers")
        history.push("/allUsers");
      })
      .catch((error) => {
        alert("Update failed");
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
        <h4>Update Employee Form</h4>
        <br />
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Full Name"
            id="name"
            onChange={(e) => handleChange(e)}
            defaultValue={props.location.props.name}
          />
        </Form.Group>

        <Form.Group controlId="dob">
          <Form.Label>Date Of Birth</Form.Label>
          <Form.Control
            type="date"
            placeholder="date"
            id="dob"
            onChange={(e) => handleChange(e)}
            defaultValue={props.location.props.dob}
          />
        </Form.Group>

        <Form.Group controlId="gender">
          <Form.Label>Gender</Form.Label>
          <Form.Select
            onChange={(e) => handleChange(e)}
            id="gender"
            defaultValue={props.location.props.gender}
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
            onChange={(e) => handleChange(e)}
            defaultValue={props.location.props.contact}
          />
        </Form.Group>

        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Apartment No, floor.."
            id="address"
            onChange={(e) => handleChange(e)}
            defaultValue={props.location.props.address}
          />
        </Form.Group>

        <Form.Group controlId="qualification">
          <Form.Label>Highest Qualification</Form.Label>
          <Form.Select
            onChange={(e) => handleChange(e)}
            id="qualification"
            defaultValue={props.location.props.qualification}
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
            onChange={(e) => handleChange(e)}
            defaultValue={props.location.props.experience}
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email of employee"
            id="email"
            onChange={(e) => handleChange(e)}
            defaultValue={props.location.props.email}
          />
        </Form.Group>

        <br />
        <Button type="submit">Update</Button>
      </Form>
    </div>
  );
};

export default EditEmployee;
