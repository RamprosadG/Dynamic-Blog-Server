import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Row, Col } from "react-bootstrap";
import Box from "@mui/material/Box";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import ReactQuill from "react-quill";
import { Form } from "react-bootstrap";
import AuthContext from "../../context/authContext";

const HomePage = () => {
  const [sidebarData, setSidebarData] = useState([]);
  const [lastSelectedItem, setLastSelectedItem] = useState(null);
  const [blogData, setBlogData] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchSidebarData();
  }, [searchText]);

  useEffect(() => {
    fetchBlogData();
  }, [lastSelectedItem]);

  useEffect(() => {
    fetchRandomBlogId();
  }, []);

  const fetchRandomBlogId = () => {
    try {
      axios
        .get("http://localhost:5000/user/getRandomBlogId")
        .then((response) => {
          setLastSelectedItem(response.data.data.id);
        });
    } catch (error) {
      console.log("There is an error to fetch sidebar data");
    }
  };

  const fetchSidebarData = () => {
    const formData = {
      search: searchText,
    };
    try {
      axios
        .get("http://localhost:5000/user/getSidebarData", {
          params: formData,
        })
        .then((response) => {
          setSidebarData(response.data.data);
        });
    } catch (error) {
      console.log("There is an error to fetch sidebar data");
    }
  };

  const fetchBlogData = () => {
    try {
      const formData = {
        id: lastSelectedItem,
      };
      axios
        .get("http://localhost:5000/user/getOneBlogById", {
          params: formData,
        })
        .then((response) => {
          setBlogData(response.data.data);
        });
    } catch (error) {
      console.log("There is an error to fetch sidebar data");
    }
  };

  const handleItemSelectionToggle = (event, itemId, isSelected) => {
    if (isSelected && !isNaN(itemId)) {
      setLastSelectedItem(itemId);
    }
  };

  const handleSearchChange = (e) => {
    console.log(e.target.value);
    setSearchText(e.target.value);
  };

  const modules = {
    toolbar: false,
  };

  return (
    <>
      <div className="my-3">
        <Row>
          <Col md={3}>
            <Col className="home-page-sidebar pb-3">
              <div className="m-3">
                <Form.Control
                  type="search"
                  id="blog-search"
                  placeholder="Search blog"
                  value={searchText}
                  onChange={handleSearchChange}
                  className="home-page-search"
                />
              </div>
              <div>
                <Box>
                  <RichTreeView
                    items={sidebarData}
                    onItemSelectionToggle={handleItemSelectionToggle}
                  />
                </Box>
              </div>
            </Col>
          </Col>

          <Col md={9}>
            <Col className="home-page-blog">
              <div className="blog-title text-center mt-3">
                <h1>{blogData && blogData.title}</h1>
              </div>
              <div className="blog-description mt-5">
                {blogData && (
                  <ReactQuill
                    id="react-quill"
                    theme="snow"
                    value={blogData.description}
                    modules={modules}
                    readOnly={true}
                  />
                )}
              </div>
            </Col>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default HomePage;
