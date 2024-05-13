import { Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Card, Form } from "react-bootstrap";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const TopicPage = () => {
  const [topicName, setTopicName] = useState("");
  const [topicError, setTopicError] = useState("")
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setTopicValue();
    }
  }, []);

  const setTopicValue = () => {
    axiosInstance
      .get(`/api/admin/topic/single/${id}`)
      .then((response) => {
        setTopicName(response.data.data.name);
      })
      .catch(() => {
        console.log("server error");
      });
  };

  const handleTopicName = (event) => {
    if (!event.target.value) {
      setTopicError("Required")
      return
    }
    setTopicName(event.target.value);

  };

  const handleRedirectToAdminPage = () => {
    navigate("/admin");
  };

  const handleAddTopic = (e) => {
    e.preventDefault();
    setTopicError(topicName ? "" : "Required")
    if (!topicName) {
      return
    }
    try {
      const formData = {
        name: topicName,
      };
      axiosInstance
        .post("/api/admin/topic/create", formData)
        .then((response) => {
          alert(response.data.message);
          response.data.success && navigate("/admin");
        });
    } catch (error) {
      console.log("Error to add topic");
    }
  };

  const handleUpdateTopic = (e) => {
    e.preventDefault();
    try {
      const formData = {
        name: topicName,
      };
      axiosInstance
        .put(`/api/admin/topic/update/${id}`, formData)
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
              <p className="text-danger fs-6">{topicError}</p>
            </Form>

            <div className="d-flex justify-content-end mt-4">
              <Button
                variant="outline-secondary"
                onClick={!id ? handleAddTopic : handleUpdateTopic}
              >
                {id ? "Update" : "Add"} topic
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
