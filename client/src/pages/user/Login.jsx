import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleForgotPassword = () => {
    // Handle forgot password action
    console.log("Forgot password clicked");
  };

  const handleLogin = () => {
    // Handle login action
    console.log("Login clicked");
  };

  const handleReset = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="card mt-3" style={{ width: "50%" }}>
          <div className="card-body">
            <div className="card-title text-center">
              <h2>Login</h2>
            </div>

            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
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
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </Form.Group>

              <div className="d-flex justify-content-end mt-3">
                <Button
                  variant="primary"
                  className="me-2"
                  onClick={handleLogin}
                >
                  Login
                </Button>
                <Button variant="secondary" onClick={handleReset}>
                  Reset
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
