import { Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Card, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useLocation, useParams } from "react-router-dom";

const TopicPage = () => {
  const [topicName, setTopicName] = useState("");
  const navigate = useNavigate();
  const { option } = useParams();
  const location = useLocation();
  const id = location.state.id;

  useEffect(() => {
    if (option == "Update") {
      setTopicValue();
    }
  }, []);

  const setTopicValue = () => {
    axios
      .get(`http://localhost:5000/api/admin/topic/single/${id}`)
      .then((response) => {
        setTopicName(response.data.data.name);
      })
      .catch(() => {
        console.log("server error");
      });
  };

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
      axios
        .post("http://localhost:5000/api/admin/topic/create", formData)
        .then((response) => {
          alert(response.data.message);
          response.data.success && navigate("/admin");
        });
    } catch (error) {
      console.log("Error to add topic");
    }
  };

  const handleUpdateTopic = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        name: topicName,
      };
      axios
        .put(`http://localhost:5000/api/admin/topic/update/${id}`, formData)
        .then((response) => {
          alert(response.data.message);
          response.data.success && navigate("/admin");
        });
    } catch (error) {
      console.log("There is an error");
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center my-5">
        <Card className="card-width">
          <Card.Body>
            <Card.Title className="text-center">Add a topic</Card.Title>
            <Form className="my-3">
              <Form.Group controlId="topic-name">
                <Form.Label>Topic name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter topic name"
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
                onClick={option === "Add" ? handleAddTopic : handleUpdateTopic}
              >
                {option} topic
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
