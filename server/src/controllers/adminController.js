const {
  getBlogById,
  getBlogTitle,
  getBlogDescription,
  addNewBlog,
  updateExistingBlog,
  deleteExistingBlog,
} = require("../models/blogModel");
const {
  getTopicById,
  getTopicName,
  addNewTopic,
  updateExistingTopic,
  deleteExistingTopic,
} = require("../models/topicModel");

exports.getTopic = async (req, res) => {
  const id = req.body.id;

  if (!id) {
    res.status(400).json({ error: "Bad request" });
    return;
  }
  const result = await getTopicById(id);

  if (!result) {
    res.status(500).json({ error: "Internal server error" });
    return;
  }

  if (!result.length) {
    res.status(404).json({ error: "The topic is not found" });
    return;
  }
  res
    .status(200)
    .json({ message: "Found the topic successfully", data: result });
};

exports.addTopic = async (req, res) => {
  const name = req.body["name"];

  if (!name) {
    res.status(400).json({ error: "Bad request" });
    return;
  }
  const existingName = await getTopicName(name);

  if (existingName === name) {
    res.status(409).json({ error: "The topic already exists" });
    return;
  }
  const result = await addNewTopic(req.body);

  if (!result) {
    res.status(500).json({ error: "Internal server error" });
    return;
  }
  res.status(201).json({ message: "Topic is added successfully" });
};

exports.updateTopic = async (req, res) => {
  const id = req.body["id"];
  const name = req.body["name"];

  if (!name) {
    res.status(400).json({ error: "Bad request" });
    return;
  }

  const existingName = await getTopicName(name);

  if (existingName === name) {
    res.status(409).json({ Error: "The topic already exist" });
    return;
  }
  const topic = getTopicById(id);

  if (!topic) {
    res.status(500).json({ error: "Internal server error" });
    return;
  }

  if (!topic.length) {
    res.status(404).json({ error: "The topic is not found" });
    return;
  }
  const result = updateExistingTopic(req.body);

  if (!result) {
    res.status(500).json({ Error: "Internal server error" });
    return;
  }
  res.status(200).json({ Message: "Topic is updated successfully" });
};

exports.deleteTopic = async (req, res) => {
  const id = req.body["id"];

  if (!id) {
    res.status(400).json({ error: "Bad request" });
    return;
  }
  const topic = getTopicById(id);

  if (!topic) {
    res.status(500).json({ error: "Internal server error" });
    return;
  }

  if (!topic.length) {
    res.status(404).json({ error: "The topic is not found" });
    return;
  }
  const result = deleteExistingTopic(req.body);

  if (!result) {
    res.status(500).json({ Error: "Internal server error" });
    return;
  }
  res.status(200).json({ Message: "Topic is deleted successfully" });
};

exports.getBlog = async (req, res) => {
  const id = req.body["id"];

  if (!id) {
    res.status(400).json({ error: "Bad request" });
    return;
  }
  const result = await getBlogById(id);

  if (!result) {
    res.status(500).json({ error: "Internal server error" });
    return;
  }

  if (!result.length) {
    res.status(404).json({ error: "The blog is not found" });
    return;
  }
  res
    .status(200)
    .json({ message: "Found the blog successfully", data: result });
};

exports.addBlog = async (req, res) => {
  const title = req.body["title"];
  const description = req.body["title"];

  if (!title || !description) {
    res.status(400).json({ error: "Bad request" });
    return;
  }
  const existingTitle = await getBlogTitle(title);

  if (existingTitle === title) {
    res.status(409).json({ error: "The title already exists" });
    return;
  }
  const existingDescription = await getBlogDescription(title);

  if (existingDescription === description) {
    res.status(409).json({ error: "The description already exists" });
    return;
  }
  const result = await addNewBlog(req.body);

  if (!result) {
    res.status(500).json({ error: "Internal server error" });
    return;
  }
  res.status(201).json({ message: "Blog is added successfully" });
};

exports.updateBlog = async (req, res) => {
  const id = req.body["id"];
  const description = req.body["description"];
  const title = req.body["title"];

  if (!title || !description) {
    res.status(400).json({ error: "Bad request" });
    return;
  }
  const existingTitle = await getBlogTitle(title);

  if (existingTitle === title) {
    res.status(409).json({ Error: "The title already exists" });
    return;
  }
  const existingDescription = await getBlogDescription(description);

  if (existingDescription === description) {
    res.status(409).json({ Error: "The description already exists" });
    return;
  }
  const blog = getBlogById(id);

  if (!blog) {
    res.status(500).json({ error: "Internal server error" });
    return;
  }

  if (!blog.length) {
    res.status(404).json({ error: "The blog is not found" });
    return;
  }
  const result = updateExistingBlog(req.body);

  if (!result) {
    res.status(500).json({ Error: "Internal server error" });
    return;
  }
  res.status(200).json({ Message: "Blog is updated successfully" });
};

exports.deleteBlog = async (req, res) => {
  const id = req.body["id"];

  if (!id) {
    res.status(400).json({ error: "Bad request" });
    return;
  }
  const topic = getBlogById(id);

  if (!topic) {
    res.status(500).json({ error: "Internal server error" });
    return;
  }

  if (!topic.length) {
    res.status(404).json({ error: "The blog is not found" });
    return;
  }
  const result = deleteExistingBlog(req.body);

  if (!result) {
    res.status(500).json({ Error: "Internal server error" });
    return;
  }
  res.status(200).json({ Message: "Blog is deleted successfully" });
};
