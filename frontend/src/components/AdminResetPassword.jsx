import "./AdminForgotPassword.css";
import React, { useState } from "react";
import HTTP from "../config/Axios";
import { useHistory } from "react-router";

const AdminResetPassword = (token) => {
  const history = useHistory();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function submitData(e) {
    e.preventDefault();
    const url = `/password/reset/${token}`;
    HTTP.post(url, {
      password: password,
      confirmPassword: confirmPassword,
    })
      .then((res) => {
        alert("Password updated successfully");
        // console.log(res.data)
        history.push({
          pathname: "/adminLogin",
        });
        console.log(res.data);
      })
      .catch((err) => {
        alert("Password Updation failed");
      });
  }

  function passwordhandler(e) {
    setPassword(e.target.value);
  }

  function ConfirmPasswordHandler(e) {
    setConfirmPassword(e.target.value);
  }

  return (
    <>
      <div className="login-page">
        <div className="form">
          <div className="login">
            <div className="login-header">
              <h4>Password Update</h4>
            </div>
          </div>
          <form className="login-form" onSubmit={(e) => submitData(e)}>
            <input
              type="text"
              placeholder="New Password"
              onChange={passwordhandler}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              onChange={ConfirmPasswordHandler}
            />
            <button>Done</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminResetPassword;
