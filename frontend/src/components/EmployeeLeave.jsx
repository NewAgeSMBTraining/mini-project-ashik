import "./EmployeeLeave.css";

import { Button, Form } from "react-bootstrap";
import HTTP from "../config/Axios";
import React, { useState } from "react";
import { useHistory } from "react-router";

const EmployeLeave = (props) => {
  //console.log(props.location.props.name);

  const [data, setData] = useState({
    userId: props.location.props._id,
    name: props.location.props.name,
    fromDate: "",
    toDate: "",
    reason: "",
  });

  const history = useHistory();

  function submitData(e) {
    e.preventDefault();
    const url = `/createLeave/${props.location.props.id}`;
    HTTP.post(url, {
      userId: data.userId,
      name: data.name,
      fromDate: data.fromDate,
      toDate: data.toDate,
      reason: data.reason,
    })
      .then((res) => {
        alert("Leave application sent successfully");
        //<Alert variant="success">Employee Added Successfully</Alert>
        history.push({
          pathname: "/myDetails",
          props: { _id: props.location.props._id },
        });
      })
      .catch((err) => {
        alert("Leave application senting Failed");
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
        <h4>Apply Leave</h4>
        <br />

        <Form.Group>
          <Form.Label>From Date</Form.Label>
          <Form.Control
            type="date"
            placeholder="date"
            id="fromDate"
            value={data.fromDate}
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>To Date</Form.Label>
          <Form.Control
            type="date"
            placeholder="date"
            id="toDate"
            value={data.toDate}
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Reason</Form.Label>
          <Form.Control
            type="textarea"
            placeholder="Reason here.."
            id="reason"
            value={data.reason}
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>

        <br />
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
};

export default EmployeLeave;
