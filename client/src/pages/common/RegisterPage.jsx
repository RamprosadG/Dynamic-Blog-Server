import axios from "axios";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const RegisterPage = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = async (e) => {
    //console.log("Register clicked");
    e.preventDefault();
    try {
      const formData = {
        userName: userName,
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password,
      };
      console.log(formData);
      await axios
        .post("http://localhost:5000/register", formData)
        .then((response) => {
          alert(response.data.message);
        });
    } catch (error) {
      console.log("There is an error", error);
    }
  };

  const handleReset = () => {
    setUserName("");
    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword("");
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="card card-width my-3">
          <div className="card-body">
            <div className="card-title text-center">
              <h2>Register</h2>
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

              <Form.Group className="mb-5" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicUserName">
                <Form.Label>User name</Form.Label>
                <Form.Control
                  type="text"
                  value={userName}
                  onChange={handleUserNameChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicFirstName">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="text"
                  value={firstName}
                  onChange={handleFirstNameChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicLastName">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  type="text"
                  value={lastName}
                  onChange={handleLastNameChange}
                />
              </Form.Group>

              <div className="d-flex justify-content-end mt-5">
                <Button
                  variant="outline-secondary"
                  className="me-3"
                  onClick={handleReset}
                >
                  Reset
                </Button>
                <Button variant="outline-secondary" onClick={handleRegister}>
                  Register
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
