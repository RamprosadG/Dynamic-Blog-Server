import { Button } from "react-bootstrap";
import React, { useState } from "react";
import { Card, Form } from "react-bootstrap";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Topic = () => {
  const [inputValue, setInputValue] = useState("");
  const [navigate, setNavigate] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleClearClick = () => {
    setInputValue("");
  };

  const handleAddTopic = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        name: inputValue,
      };
      await axios
        .post("http://localhost:5000/admin/addTopic", formData)
        .then((response) => {
          const successfulResponse = "The topic is added successfully.";
          response.data.message === successfulResponse && setNavigate(true);
          alert(response.data.message);
        });
    } catch (error) {
      console.log("There is an error");
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center my-5">
        {navigate && <Navigate to="/admin/home" />}
        <Card style={{ width: "50%" }}>
          <Card.Body>
            <Card.Title className="text-center">Add a new topic</Card.Title>

            <Form className="my-3">
              <Form.Group controlId="formInput">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  required
                  value={inputValue}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Form>
            <div className="d-flex justify-content-end">
              <Button
                variant="secondary"
                className="mr-2"
                onClick={handleClearClick}
              >
                Clear
              </Button>
              <Button
                variant="primary"
                className="ms-2"
                onClick={handleAddTopic}
              >
                Add
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default Topic;
