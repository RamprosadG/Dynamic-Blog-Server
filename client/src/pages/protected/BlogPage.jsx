import { Button, Col, Row } from "react-bootstrap";
import React, { useState, useEffect } from "react";
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
  const id = location.state.id;

  useEffect(() => {
    if (option == "Update") {
      setBlogValue();
    }
  }, []);

  const setBlogValue = () => {
    axios
      .get(`http://localhost:5000/api/admin/blog/single/${id}`)
      .then((response) => {
        setTitle(response.data.data.title);
        setTopic(response.data.data.topic_id);
        setDescription(response.data.data.description);
      })
      .catch(() => {
        console.log("server error");
      });
  };

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
    e.preventDefault();
    try {
      const formData = {
        topicId: parseInt(topic),
        title: title,
        description: description,
        userId: 1, //need to update later
      };
      await axios
        .post("http://localhost:5000/api/admin/blog/create", formData)
        .then((response) => {
          alert(response.data.message);
          response.data.success && navigate("/admin");
        });
    } catch (error) {
      console.log("Error in add blog.");
    }
  };

  const handleUpdateBlog = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        topicId: parseInt(topic),
        title: title,
        description: description,
      };
      axios
        .put(`http://localhost:5000/api/admin/blog/update/${id}`, formData)
        .then((response) => {
          alert(response.data.message);
          response.data.success && navigate("/admin");
        });
    } catch (error) {
      console.log("Error in update blog.");
    }
  };

  return (
    <>
      <div className="blog-page my-3">
        <Card>
          <Card.Body>
            <Card.Title className="text-center mb-4">Add a blog</Card.Title>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>Select topic</Form.Label>
                <TopicDropdown value={topic} updateTopic={handleTopicChange} />
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
              <TextEditor
                updateDescription={handleDescriptionChange}
                value={description}
              />
            </Row>
            <Row>
              <Col className="d-flex justify-content-end mt-4">
                <Button
                  variant="outline-secondary"
                  className="ms-2"
                  onClick={option === "Add" ? handleAddBlog : handleUpdateBlog}
                >
                  {option} blog
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
