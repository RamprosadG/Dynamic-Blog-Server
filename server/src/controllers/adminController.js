const {
  getBlogById,
  getBlogTitle,
  getBlogDescription,
  addNewBlog,
  updateExistingBlog,
  deleteExistingBlog,
  getBlogInfoForTable,
} = require("../models/blogModel");
const {
  getTopicById,
  allTopic,
  getTopicName,
  addNewTopic,
  updateExistingTopic,
  deleteExistingTopic,
  getTopicInfoForTable,
} = require("../models/topicModel");

exports.getTopic = async (req, res) => {
  const id = req.body.id;

  if (!id) {
    res.json({ message: "Id is required." });
    return;
  }
  const result = await getTopicById(id);

  if (!result) {
    res.json({ message: "Internal server error" });
    return;
  }

  if (!result.length) {
    res.json({ message: "The topic is not found." });
    return;
  }
  res.json({ message: "Found the topic successfully.", data: result });
};

exports.getAllTopic = async (req, res) => {
  const result = await allTopic();

  if (!result) {
    res.json({ message: "Internal server error." });
    return;
  }

  res.json({ message: "All topic are fetched successfully.", data: result });
};

exports.addTopic = async (req, res) => {
  const name = req.body.name;

  if (!name) {
    res.json({ message: "The name is required." });
    return;
  }
  const existingName = await getTopicName(name);

  if (existingName === name) {
    res.json({ message: "The topic already exists." });
    return;
  }
  const result = await addNewTopic(req.body);

  if (!result) {
    res.json({ message: "Internal server error." });
    return;
  }
  res.json({ message: "The topic is added successfully." });
};

exports.updateTopic = async (req, res) => {
  const id = req.body["id"];
  const name = req.body["name"];

  if (!name) {
    res.json({ message: "Name is required." });
    return;
  }

  const existingName = await getTopicName(name);

  if (existingName === name) {
    res.json({ message: "The topic already exists." });
    return;
  }
  const topic = getTopicById(id);

  if (!topic) {
    res.json({ message: "Internal server error" });
    return;
  }

  if (!topic.length) {
    res.json({ message: "The topic is not found." });
    return;
  }
  const result = updateExistingTopic(req.body);

  if (!result) {
    res.json({ message: "Internal server error" });
    return;
  }
  res.json({ message: "Topic is updated successfully" });
};

exports.deleteTopic = async (req, res) => {
  const id = req.body["id"];

  if (!id) {
    res.json({ message: "Id is required." });
    return;
  }
  const topic = getTopicById(id);

  if (!topic) {
    res.json({ message: "Internal server error" });
    return;
  }

  if (!topic.length) {
    res.json({ message: "The topic is not found" });
    return;
  }
  const result = deleteExistingTopic(req.body);

  if (!result) {
    res.json({ message: "Internal server error" });
    return;
  }
  res.json({ message: "Topic is deleted successfully" });
};

exports.getBlog = async (req, res) => {
  const id = req.body["id"];

  if (!id) {
    res.json({ message: "Id is required." });
    return;
  }
  const result = await getBlogById(id);

  if (!result) {
    res.json({ message: "Internal server error" });
    return;
  }

  if (!result.length) {
    res.json({ message: "The blog is not found" });
    return;
  }
  res.json({ message: "Found the blog successfully", data: result });
};

exports.addBlog = async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const topicId = req.body.topicId;

  if (!title || !description || !topicId || description === "<p><br></p>") {
    res.json({ message: "Topic, title and description are required." });
    return;
  }
  const existingTitle = await getBlogTitle(title);

  if (existingTitle === title) {
    res.json({ message: "The title already exists." });
    return;
  }
  const existingDescription = await getBlogDescription(description);

  if (existingDescription === description) {
    res.json({ message: "The description already exists." });
    return;
  }
  const result = await addNewBlog(req.body);

  if (!result) {
    res.json({ message: "Internal server error." });
    return;
  }
  res.json({ message: "The blog is added successfully." });
};

exports.updateBlog = async (req, res) => {
  const id = req.body.id;
  const description = req.body.description;
  const title = req.body.title;
  const topic = req.body.topic;

  if (!title || !description || !topic || description === "<p><br></p>") {
    res.json({ message: "The title, topic and description are required." });
    return;
  }
  const existingTitle = await getBlogTitle(title);

  if (existingTitle === title) {
    res.json({ message: "The title already exists." });
    return;
  }
  const existingDescription = await getBlogDescription(description);

  if (existingDescription === description) {
    res.json({ message: "The description already exists." });
    return;
  }
  const blog = getBlogById(id);

  if (!blog) {
    res.json({ message: "Internal server error." });
    return;
  }

  if (!blog.length) {
    res.json({ message: "The blog is not found." });
    return;
  }
  const result = updateExistingBlog(req.body);

  if (!result) {
    res.json({ message: "Internal server error." });
    return;
  }
  res.json({ message: "The blog is updated successfully." });
};

exports.deleteBlog = async (req, res) => {
  const id = req.body.id;

  if (!id) {
    res.json({ message: "Bad request" });
    return;
  }
  const topic = getBlogById(id);

  if (!topic) {
    res.json({ message: "Internal server error" });
    return;
  }

  if (!topic.length) {
    res.json({ message: "The blog is not found" });
    return;
  }
  const result = deleteExistingBlog(req.body);

  if (!result) {
    res.json({ message: "Internal server error" });
    return;
  }
  res.json({ message: "Blog is deleted successfully" });
};

exports.getAllBlog = async (req, res) => {
  const result = await allBlog();

  if (!result) {
    res.json({ message: "Internal server error." });
    return;
  }

  res.json({ message: "All blogs are fetched successfully.", data: result });
};

exports.getBlogsForTable = async (req, res) => {
  const data = await getBlogInfoForTable(req.query);
  res.json(data);
};

exports.getTopicForTable = async (req, res) => {
  const data = await getTopicInfoForTable(req.query);
  res.json(data);
};
