import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";

const TopicDropdown = ({ value, updateTopic }) => {
  const [options, setOptions] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");

  useEffect(() => {
    setSelectedTopic(value);
  }, [value]);

  const handleTopicChange = (event) => {
    setSelectedTopic(event.target.value);
    updateTopic(event.target.value);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/topic/all")
      .then((response) => {
        const topic = response.data.data;
        setOptions(topic);
      })
      .catch(() => {
        console.log("server error");
      });
  }, []);

  return (
    <Form.Select
      id="topic-select"
      onChange={handleTopicChange}
      value={selectedTopic}
    >
      <option id="option" key={"option"} value={""}>
        Select topic
      </option>
      {options?.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </Form.Select>
  );
};

export default TopicDropdown;
