import "./EmployeResetPassword.css";

import "./AdminForgotPassword.css";
import React, { useState } from "react";
import HTTP from "../config/Axios";
import { useHistory } from "react-router";

const EmployeResetPassword = (props) => {
  const history = useHistory();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function submitData(e) {
    e.preventDefault();

    const url = `/updatePassword/${props.location.props._id}`;
    HTTP.put(url, {
      password: password,
      confirmPassword: confirmPassword,
      role: props.location.props.role,
    })
      .then((res) => {
        alert("Password Updated successfully");
        history.push({
          pathname: "/",
        });
      })
      .catch((err) => {
        alert("Password Updation Failed");
      });
  }

  function oldPasswordhandler(e) {
    setPassword(e.target.value);
  }

  function newPasswordHandler(e) {
    setConfirmPassword(e.target.value);
  }

  return (
    <>
      <div className="login-page">
        <div className="form">
          <div className="login">
            <div className="login-header">
              <h4>Employee Reset Password</h4>
            </div>
          </div>
          <form className="login-form" onSubmit={(e) => submitData(e)}>
            <input
              type="text"
              placeholder="New Password"
              onChange={oldPasswordhandler}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              onChange={newPasswordHandler}
            />
            <button>Done</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EmployeResetPassword;
