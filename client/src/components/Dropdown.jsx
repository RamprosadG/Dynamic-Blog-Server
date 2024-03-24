import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";

const TopicDropdown = ({ udpateTopic }) => {
  const [options, setOptions] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/getAllTopic")
      .then((response) => {
        const topic = response.data.data;
        setOptions(topic);
      })
      .catch(() => {
        console.log("server error");
      });
  }, []);

  const handleTopicChange = (event) => {
    udpateTopic(event.target.value);
    setSelectedTopic(event.target.value);
  };

  return (
    <Form.Select onChange={handleTopicChange} value={selectedTopic}>
      <option key={"option"} value={""}>
        Select a Topic
      </option>
      {options.map((option, index) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </Form.Select>
  );
};

export default TopicDropdown;
