import "./AdminLogin.css";
import React, { useState } from "react";
import HTTP from "../config/Axios";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const AdminLogin = () => {
  const history = useHistory();

  const url = "/adminLogin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function submitData(e) {
    e.preventDefault();

    HTTP.post(url, {
      email: email,
      password: password,
    })
      .then((res) => {
        alert("Login Success");
        localStorage.setItem("jwtToken", res.data.token);
        history.push({
          pathname: "/allUsers",
          props: res.data.user,
        });
      })
      .catch((err) => {
        console.log("Catch");
        alert("Login Failed");
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
              <h4>Admin Login</h4>
            </div>
          </div>
          <form className="login-form" onSubmit={(e) => submitData(e)}>
            <input type="text" placeholder="email" onChange={emailHandler} />
            <input
              type="password"
              placeholder="password"
              onChange={passwordHandler}
            />
            <button>login</button>
            <p>
              Not registered ?....
              <Link
                style={{ textDecoration: "none" }}
                to={{
                  pathname: "/adminRegister",
                }}
              >
                Signup here
              </Link>
            </p>
            <p className="message">
              <Link
                style={{ textDecoration: "none" }}
                to={{
                  pathname: "/forgotPassword",
                }}
              >
                Forgot Password ?
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
