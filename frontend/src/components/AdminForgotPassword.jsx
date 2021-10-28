import "./AdminForgotPassword.css";

import React, { useState } from "react";
import HTTP from "../config/Axios";
import { useHistory } from "react-router";

const AdminForgotPassword = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");

  function submitData(e) {
    e.preventDefault();
    const url = "/password/forgot";
    HTTP.post(url, {
      email: email,
    })
      .then((res) => {
        alert("Reset mail sent successfully");
        console.log(res);
        history.push({
          pathname: "/",
          //props: res.data.user
        });
      })
      .catch((err) => {
        alert("Reset mail sent Failed");
      });
  }

  function emailHandler(e) {
    setEmail(e.target.value);
  }

  return (
    <>
      <div className="login-page">
        <div className="form">
          <div className="login">
            <div className="login-header">
              <h4>Forgot Password ?</h4>
            </div>
          </div>
          <form className="login-form" onSubmit={(e) => submitData(e)}>
            <input
              type="text"
              placeholder="Enter Registered email"
              onChange={emailHandler}
            />
            <button>Done</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminForgotPassword;
