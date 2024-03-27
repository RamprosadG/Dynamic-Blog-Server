import { Button } from "react-bootstrap";
import React, { useState } from "react";
import { Card, Form } from "react-bootstrap";
import axios from "axios";
import { Navigate } from "react-router-dom";
import "bootstrap";

const Topic = () => {
  const [topicName, setTopicName] = useState("");
  const [navigate, setNavigate] = useState(false);

  const handleTopicName = (event) => {
    setTopicName(event.target.value);
  };

  const handleReset = () => {
    setTopicName("");
  };

  const handleRedirectToAdminPage = () => {
    setNavigate(true);
  };

  const handleAddTopic = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        name: topicName,
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
            <Card.Title className="text-center">Add a topic</Card.Title>

            <Form className="my-3">
              <Form.Group controlId="formInput">
                <Form.Label>Topic name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter topic name"
                  required
                  value={topicName}
                  onChange={handleTopicName}
                />
              </Form.Group>
            </Form>

            <div className="d-flex justify-content-end mt-4">
              <Button
                variant="outline-secondary"
                className="mr-2"
                onClick={handleReset}
              >
                Reset
              </Button>
              <Button
                variant="outline-secondary"
                className="ms-2"
                onClick={handleAddTopic}
              >
                Add Topic
              </Button>
            </div>

            <div className="col">
              <Button
                variant="link"
                className="ms-2"
                onClick={handleRedirectToAdminPage}
              >
                Go to admin page
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default Topic;
