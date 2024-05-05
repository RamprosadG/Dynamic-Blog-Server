import React from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import axios from "axios";
import { codeSchema } from "../../schema/verifyEmailForm";

const EmailVerificationPage = () => {
  const { token } = useParams;
  const formik = useFormik({
    initialValues: {
      code: null,
    },
    validationSchema: codeSchema,
    onSubmit: (values) => {
      try {
        axios
          .post(`http://localhost:5000/api/verify/${token}`, values)
          .then((response) => {
            console.log(response.data);
          });
      } catch (error) {
        console.log("There is an error", error);
      }
    },
  });

  return (
    <>
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <Card className="my-3">
            <Card.Body>
              <div className="mb-4">
                A verification code is sent to your email. Please check your
                email and enter the code.
              </div>
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group>
                  <Form.Control
                    id="verificationCode"
                    name="code"
                    type="number"
                    placeholder="Enter code"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.code}
                  />
                  {formik.touched.code && formik.errors.code ? (
                    <div className="error-message">{formik.errors.code}</div>
                  ) : null}
                </Form.Group>
                <Form.Group className="d-flex justify-content-center mt-4">
                  <Button variant="outline-secondary" type="submit">
                    Submit
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

export default EmailVerificationPage;
