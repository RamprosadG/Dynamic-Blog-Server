import axios from "axios";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { registerSchema } from "../../schema/registerForm";

const RegisterPage = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      try {
        axios
          .post("http://localhost:5000/api/register", values)
          .then((response) => {
            response.data.success && navigate("/");
            alert(response.data.message);
          });
      } catch (error) {
        console.log("There is an error", error);
      }
    },
  });

  const handleNavigateLoginPage = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="card card-width my-3">
          <div className="card-body">
            <div className="card-title text-center mb-5">
              <h2>Register</h2>
            </div>
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group className="mb-4">
                <Form.Control
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Username"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                />
                {formik.touched.username && formik.errors.username ? (
                  <div>{formik.errors.username}</div>
                ) : null}
              </Form.Group>

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

              <Form.Group className="mt-3">
                <Button variant="outline-secondary" type="submit">
                  Register
                </Button>
              </Form.Group>
              <Form.Group className="d-flex justify-content-center mt-4">
                <Button variant="link" onClick={handleNavigateLoginPage}>
                  Already have an account? Login
                </Button>
              </Form.Group>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
