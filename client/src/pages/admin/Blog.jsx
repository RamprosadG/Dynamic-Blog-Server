import { Button, Col, Row } from "react-bootstrap";
import React, { useState } from "react";
import { Card, Form } from "react-bootstrap";
import axios from "axios";
import { Navigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import TextEditor from "../../components/TextEditor";
import TopicDropdown from "../../components/Dropdown";
import "../../styles/quill.css";

const Blog = () => {
  const [topic, setTopic] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [navigate, setNavigate] = useState(false);

  const handleTopicChange = (newTopic) => {
    setTopic(newTopic);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (newDescription) => {
    setDescription(newDescription);
  };

  const handleRedirectToAdminPage = () => {
    setNavigate(true);
  };

  const handleAddBlog = async (e) => {
    console.log(topic, title, description);
    e.preventDefault();
    const date = new Date();
    try {
      const formData = {
        topicId: topic,
        title: title,
        description: description,
        userId: 1,
        date: date,
        status: false,
        publishDate: date,
      };
      await axios
        .post("http://localhost:5000/admin/addBlog", formData)
        .then((response) => {
          const successfulResponse = "The blog is added successfully.";
          response.data.message === successfulResponse && setNavigate(true);
          alert(response.data.message);
        });
    } catch (error) {
      console.log("There is an error");
    }
  };

  return (
    <>
      <div className="my-3">
        {navigate && <Navigate to="/admin/home" />}
        <Card>
          <Card.Body>
            <Card.Title className="text-center mb-4">Add a blog</Card.Title>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>Select topic</Form.Label>
                <TopicDropdown udpateTopic={handleTopicChange} />
              </Col>
              <Col md={6}>
                <Form.Label>Blog title</Form.Label>
                <Form.Control
                  type="text"
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="Enter a title"
                />
              </Col>
            </Row>
            <Row className="my-3">
              <TextEditor udpateDescription={handleDescriptionChange} />
            </Row>
            <Row>
              <Col className="d-flex justify-content-end mt-4">
                <Button
                  variant="outline-secondary"
                  className="ms-2"
                  onClick={handleAddBlog}
                >
                  Add blog
                </Button>
              </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-start">
                <Button
                  variant="link"
                  className="ms-2"
                  onClick={handleRedirectToAdminPage}
                >
                  Go to admin page
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default Blog;
