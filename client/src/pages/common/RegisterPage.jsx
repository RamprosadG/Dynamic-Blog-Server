import axios from "axios";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNavigateLoginPage = () => {
    navigate("/login");
  };

  const handleRegister = async (e) => {
    //console.log("Register clicked");
    e.preventDefault();
    try {
      const formData = {
        userName: userName,
        email: email,
        password: password,
      };
      await axios
        .post("http://localhost:5000/register", formData)
        .then((response) => {
          navigate("/login");
          alert(response.data.message);
        });
    } catch (error) {
      console.log("There is an error", error);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="card card-width my-3">
          <div className="card-body">
            <div className="card-title text-center">
              <h2>Register</h2>
            </div>
            <Form.Group className="mb-3" controlId="formBasicUserName">
              <Form.Label>Enter username</Form.Label>
              <Form.Control
                type="text"
                value={userName}
                onChange={handleUserNameChange}
              />
            </Form.Group>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Enter Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Enter Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </Form.Group>

              <div className="mt-3">
                <Button variant="outline-secondary" onClick={handleRegister}>
                  Register
                </Button>
              </div>
              <div className="d-flex justify-content-center mt-4">
                <Button variant="link" onClick={handleNavigateLoginPage}>
                  Already have an account? Login
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
