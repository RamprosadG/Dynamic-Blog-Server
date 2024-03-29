import axios from "axios";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
  const [navigate, setNavigate] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleForgotPassword = () => {
    // Need to code to handle forgot password
    console.log("Forgot password clicked");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        email: email,
        password: password,
      };
      await axios
        .post("http://localhost:5000/login", formData)
        .then((response) => {
          const successfulResponse = "You are logged in successfully.";
          response.data.message === successfulResponse && setNavigate(true);
          alert(response.data.message);
        });
    } catch (error) {
      console.log("There is an error", error);
    }
  };

  const handleReset = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        {navigate && <Navigate to="/admin/home" />}
        <div className="card card-width mt-3">
          <div className="card-body">
            <div className="card-title text-center">
              <h2>Login</h2>
            </div>

            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </Form.Group>
              <div className="d-flex justify-content-end mt-3">
                <Button variant="outline-secondary" onClick={handleReset}>
                  Reset
                </Button>
                <Button
                  variant="outline-secondary"
                  className="ms-3"
                  onClick={handleLogin}
                >
                  Login
                </Button>
              </div>
              <Button variant="link" onClick={handleForgotPassword}>
                Forgot Password?
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
