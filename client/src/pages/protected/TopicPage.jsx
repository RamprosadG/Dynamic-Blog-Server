import { Button } from "react-bootstrap";
import React, { useState } from "react";
import { Card, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const TopicPage = (props) => {
  const [topicName, setTopicName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  //console.log(location.state.id);
  console.log(location);

  const handleTopicName = (event) => {
    setTopicName(event.target.value);
  };

  const handleReset = () => {
    setTopicName("");
  };

  const handleRedirectToAdminPage = () => {
    navigate("/admin");
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
          alert(response.data.message);
          response.data.message == successfulResponse && navigate("/admin");
        });
    } catch (error) {
      console.log("There is an error");
    }
  };

  // const handleUpdateTopic = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const formData = {
  //       id: data.id,
  //       name: topicName,
  //     };
  //     await axios
  //       .put("http://localhost:5000/admin/updateTopic", formData)
  //       .then((response) => {
  //         const successfulResponse = "The topic is updated successfully.";
  //         response.data.message === successfulResponse && setNavigate(true);
  //         alert(response.data.message);
  //       });
  //   } catch (error) {
  //     console.log("There is an error");
  //   }
  // };

  return (
    <>
      <div className="d-flex justify-content-center my-5">
        <Card className="card-width">
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
                Add topic
              </Button>
            </div>

            <div className="col">
              <Button
                variant="link"
                className="ms-2"
                onClick={handleRedirectToAdminPage}
              >
                Back to admin page
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default TopicPage;
