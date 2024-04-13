import axios from "axios";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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

  const handleNavigateRegisterPage = () => {
    navigate("/register");
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
          response.data.success && navigate("/");
          alert(response.data.message);
        });
    } catch (error) {
      console.log("There is an error", error);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="card card-width mt-3">
          <div className="card-body">
            <div className="card-title text-center">
              <h2>Login</h2>
            </div>

            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Enter email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Enter password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </Form.Group>
              <div className="d-flex justify-content-between mt-3">
                <div>
                  <Button
                    variant="outline-secondary"
                    className="ms-3"
                    onClick={handleLogin}
                  >
                    Login
                  </Button>
                </div>
                <div>
                  <Button variant="link" onClick={handleForgotPassword}>
                    Forgot Password?
                  </Button>
                </div>
              </div>
              <div className="d-flex justify-content-center mt-4">
                <Button variant="link" onClick={handleNavigateRegisterPage}>
                  Create an account
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
