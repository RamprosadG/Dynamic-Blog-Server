import axios from "axios";
import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "../../schema/loginForm";
import AuthContext from "../../context/authContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn, setUserInfo } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      try {
        axios
          .post("http://localhost:5000/api/login", values)
          .then((response) => {
            setIsLoggedIn(true);
            setUserInfo(response.data.data);
            response.data.success && navigate("/");
            alert(response.data.message);
            console.log(response.data.data);
          });
      } catch (error) {
        console.log("There is an error", error);
      }
    },
  });

  const handleForgotPassword = () => {
    // Need to code to handle forgot password
    console.log("Forgot password clicked");
  };

  const handleNavigateRegisterPage = () => {
    navigate("/register");
  };

  return (
    <>
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title className="text-center mb-5">
                <h2>Login</h2>
              </Card.Title>

              <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-4">
                  <Form.Control
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="error-message">{formik.errors.email}</div>
                  ) : null}
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Control
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="error-message">
                      {formik.errors.password}
                    </div>
                  ) : null}
                </Form.Group>
                <Form.Group className="d-flex justify-content-between mt-3">
                  <div>
                    <Button variant="outline-secondary" type="submit">
                      Login
                    </Button>
                  </div>
                  <div>
                    <Button variant="link" onClick={handleForgotPassword}>
                      Forgot Password?
                    </Button>
                  </div>
                </Form.Group>
                <Form.Group className="d-flex justify-content-center mt-4">
                  <Button variant="link" onClick={handleNavigateRegisterPage}>
                    Create an account
                  </Button>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default LoginPage;
