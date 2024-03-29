import { Button, Col, Row } from "react-bootstrap";
import React, { useState } from "react";
import { Card, Form } from "react-bootstrap";
import axios from "axios";
import TextEditor from "../../components/TextEditor/TextEditor";
import TopicDropdown from "../../components/Dropdown/TopicDropdown";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const BlogPage = () => {
  const [topic, setTopic] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const { option } = useParams();
  const location = useLocation();
  console.log(location.state.id);
  //console.log(location);

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
    navigate("/admin");
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
          alert(response.data.message);
          response.data.message === successfulResponse && navigate("/admin");
        });
    } catch (error) {
      console.log("There is an error");
    }
  };

  return (
    <>
      <div className="my-3">
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
                  id="blog-title"
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
                  Back to admin page
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default BlogPage;
