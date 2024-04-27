import axios from "axios";
import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "../../schema/loginForm";

const LoginPage = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      try {
        axios.post("http://localhost:5000/login", values).then((response) => {
          // setIsLoggedIn(true);
          // setUserInfo(response.data.data);
          response.data.success && navigate("/");
          alert(response.data.message);
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
      <div className="d-flex justify-content-center">
        <div className="card card-width mt-3">
          <div className="card-body">
            <div className="card-title text-center mb-5">
              <h2>Login</h2>
            </div>

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
                  <div>{formik.errors.email}</div>
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
                  <div>{formik.errors.password}</div>
                ) : null}
                <Form.Control.Feedback type="invalid">
                  Please choose a password.
                </Form.Control.Feedback>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
