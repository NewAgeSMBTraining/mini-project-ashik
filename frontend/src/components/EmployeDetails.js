import "./EmployeDetails.css";
import { Card, ListGroup } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import HTTP from "../config/Axios";
import { useHistory } from "react-router";

const EmployeDetails = (props) => {
  // console.log(props.location.props)

  const history = useHistory();

  const [empDetails, setEmpdetails] = useState({});

  const url = `/getAnEmployee/${props.location.props._id}`;

  useEffect(() => {
    HTTP.get(url).then((res) => {
      setEmpdetails(res.data.user);
    });
  }, [url]);

  const goBack = () => {
    history.push("/allUsers");
  };

  return (
    <div>
      <Card
        className="text-center"
        style={{ width: "50rem", marginLeft: "230px", marginTop: "20px" }}
      >
        <Card.Header>Employee Details</Card.Header>
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
            <ListGroup.Item>DOB : {empDetails.dob}</ListGroup.Item>
            <ListGroup.Item>Gender : {empDetails.gender}</ListGroup.Item>
            <ListGroup.Item> Contact : {empDetails.contact} </ListGroup.Item>
            <ListGroup.Item> Address : {empDetails.address} </ListGroup.Item>
            <ListGroup.Item>
              {" "}
              Qualification : {empDetails.qualification}{" "}
            </ListGroup.Item>
            <ListGroup.Item>
              {" "}
              Experience : {empDetails.experience} {"year "}
            </ListGroup.Item>
            <ListGroup.Item>
              <button onClick={goBack}>Back</button>
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  );
};

export default EmployeDetails;
