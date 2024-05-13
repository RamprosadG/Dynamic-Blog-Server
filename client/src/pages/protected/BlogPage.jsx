import { Button, Col, Row } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { Card, Form } from "react-bootstrap";
import TextEditor from "../../components/TextEditor/TextEditor";
import TopicDropdown from "../../components/Dropdown/TopicDropdown";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../context/authContext";
import axiosInstance from "../../api/axiosInstance";

const BlogPage = () => {
  const [topic, setTopic] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [topicError, setTopicError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const { userInfo } = useContext(AuthContext);

  useEffect(() => {
    if (id) {
      setBlogValue();
    }
  }, []);

  const setBlogValue = () => {
    axiosInstance
      .get(`/api/admin/blog/single/${id}`)
      .then((response) => {
        setTitle(response.data.data.title);
        setTopic(response.data.data.topicId);
        setDescription(response.data.data.description);
      })
      .catch(() => {
        console.log("server error");
      });
  };

  const handleTopicChange = (newTopic) => {
    setTopic(newTopic);
    // setTopicError(newTopic ? "" : "Required");
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    // setTitleError(event.target.value ? "" : "Required");
  };

  const handleDescriptionChange = (newDescription) => {
    setDescription(newDescription);
    // setDescriptionError(newDescription ? "" : "Required");
  };


  const handleRedirectToAdminPage = () => {
    navigate("/admin");
  };

  const handleAddBlog = (e) => {
    e.preventDefault();
    const topicIsValid = topic && topic !== "Select topic";
    const titleIsValid = title.trim() !== "";
    const descriptionIsValid = description.trim() !== "";

    // Update error messages
    setTopicError(topicIsValid ? "" : "Required");
    setTitleError(titleIsValid ? "" : "Required");
    setDescriptionError(descriptionIsValid ? "" : "Required");

    // If any field is invalid, prevent form submission
    if (!topicIsValid || !titleIsValid || !descriptionIsValid) {
      return;
    }
    try {
      const formData = {
        topicId: topic,
        title: title,
        description: description,
        userId: userInfo.id,
      };
      axiosInstance
        .post("/api/admin/blog/create", formData)
        .then((response) => {
          alert(response.data.message);
          response.data.success && navigate("/admin");
        });
    } catch (error) {
      console.log("Error in add blog.");
    }
  };

  const handleUpdateBlog = (e) => {
    e.preventDefault();
    try {
      const formData = {
        topicId: topic,
        title: title,
        description: description,
      };
      axiosInstance
        .put(`/api/admin/blog/update/${id}`, formData)
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
                <p className="text-danger fs-6">{topicError}</p>
              </Col>
              <Col md={6}>
                <Form.Label>Blog title</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="Enter a title"
                />
                <p className="text-danger fs-6">{titleError}</p>
              </Col>
            </Row>
            <Row className="my-3">
              <TextEditor
                updateDescription={handleDescriptionChange}
                value={description}
              />

            </Row>
            <p className="text-danger fs-6">{descriptionError}</p>
            <Row>
              <Col className="d-flex justify-content-end mt-4">
                <Button
                  variant="outline-secondary"
                  className="ms-2"
                  onClick={!id ? handleAddBlog : handleUpdateBlog}
                >
                  {id ? "Update" : "Add"} blog
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
