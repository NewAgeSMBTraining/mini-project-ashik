import "./EmployeLogin.css";

import React, { useState } from "react";
import HTTP from "../config/Axios";
import { useHistory } from "react-router";

const EmployeLogin = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function submitData(e) {
    e.preventDefault();

    const url = "/employeLogin";
    HTTP.post(url, {
      email: email,
      password: password,
    })
      .then((res) => {
        console.log(res);
        alert("Login Success");
        localStorage.setItem("jwtToken", res.data.token);
        history.push({
          pathname: "/myDetails",
          props: res.data.user,
        });
      })
      .catch((err) => {
        alert("Login Failed", err);
      });
  }

  function emailHandler(e) {
    setEmail(e.target.value);
  }

  function passwordHandler(e) {
    setPassword(e.target.value);
  }

  return (
    <>
      <div className="login-page">
        <div className="form">
          <div className="login">
            <div className="login-header">
              <h4>Employee Login</h4>
            </div>
          </div>
          <form className="login-form" onSubmit={(e) => submitData(e)}>
            <input type="text" placeholder="email" onChange={emailHandler} />
            <input
              type="password"
              placeholder="password"
              onChange={passwordHandler}
            />
            <button>Login</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EmployeLogin;
