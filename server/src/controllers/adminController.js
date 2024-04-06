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
  const id = req.query.id;

  if (!id) {
    return res.json({ message: "The id is required.", success: false });
  }
  const result = await getTopicById(id);

  if (!result) {
    return res.json({ message: "Internal server error", success: false });
  }

  if (!result.length) {
    return res.json({ message: "The topic is not found.", success: false });
  }
  res.json({
    message: "Found the topic successfully.",
    data: result[0],
    success: true,
  });
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
    return res.json({ message: "The name is required.", success: false });
  }
  const existingName = await getTopicName(name);

  if (existingName === name) {
    return res.json({ message: "The topic already exists.", success: false });
  }
  const result = await addNewTopic(req.body);

  if (!result) {
    return res.json({ message: "Internal server error.", success: false });
  }
  res.json({ message: "The topic is added successfully.", success: true });
};

exports.updateTopic = async (req, res) => {
  const id = req.body.id;
  const name = req.body.name;

  if (!name) {
    return res.json({ message: "Name is required.", success: false });
  }

  const topic = await getTopicById(id);

  if (!topic) {
    return res.json({ message: "Internal server error.", success: false });
  }

  if (!topic.length) {
    return res.json({ message: "The topic is not found.", success: false });
  }
  const result = await updateExistingTopic(req.body);

  if (!result) {
    return res.json({ message: "Internal server error.", success: false });
  }
  res.json({ message: "Topic is updated successfully.", success: true });
};

exports.deleteTopic = async (req, res) => {
  const id = req.body.id;

  if (!id) {
    return res.json({ message: "The id is required.", success: false });
  }
  const topic = await getTopicById(id);

  if (!topic) {
    return res.json({ message: "Internal server error.", success: false });
  }

  if (!topic.length) {
    return res.json({ message: "The topic is not found.", success: false });
  }
  const result = await deleteExistingTopic(req.body);

  if (!result) {
    return res.json({ message: "Internal server error.", success: false });
  }
  res.json({ message: "The topic is deleted successfully.", success: true });
};

exports.getBlog = async (req, res) => {
  const id = req.query.id;

  if (!id) {
    return res.json({ message: "The id is required.", success: false });
  }
  const result = await getBlogById(id);

  if (!result) {
    return res.json({ message: "Internal server error", success: false });
  }

  if (!result.length) {
    return res.json({ message: "The blog is not found", success: false });
  }
  res.json({
    message: "Found the blog successfully",
    data: result[0],
    success: true,
  });
};

exports.addBlog = async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const topicId = req.body.topicId;

  if (!title || !description || !topicId || description === "<p><br></p>") {
    return res.json({
      message: "The topic, title and description are required.",
      success: false,
    });
  }
  const existingTitle = await getBlogTitle(title);

  if (existingTitle === title) {
    return res.json({ message: "The title already exists.", success: false });
  }

  const result = await addNewBlog(req.body);

  if (!result) {
    return res.json({ message: "Internal server error.", success: false });
  }
  res.json({ message: "The blog is added successfully.", success: true });
};

exports.updateBlog = async (req, res) => {
  const id = req.body.id;
  const description = req.body.description;
  const title = req.body.title;
  const topicId = req.body.topicId;

  if (!title || !description || !topicId || description === "<p><br></p>") {
    return res.json({
      message: "The topic, title and description are required.",
      success: false,
    });
  }
  const blog = await getBlogById(id);

  if (!blog) {
    return res.json({ message: "Internal server error.", success: false });
  }

  if (!blog.length) {
    return res.json({ message: "The blog is not found.", success: false });
  }
  const result = updateExistingBlog(req.body);

  if (!result) {
    return res.json({ message: "Internal server error.", success: false });
  }
  res.json({ message: "The blog is updated successfully.", success: true });
};

exports.deleteBlog = async (req, res) => {
  const id = req.body.id;

  if (!id) {
    return res.json({ message: "The id is required.", success: false });
  }
  const blog = await getBlogById(id);

  if (!blog) {
    return res.json({ message: "Internal server error.", success: false });
  }

  if (!blog.length) {
    return res.json({ message: "The blog is not found.", success: false });
  }
  const result = await deleteExistingBlog(req.body);

  if (!result) {
    return res.json({ message: "Internal server error.", success: false });
  }
  res.json({ message: "The blog is deleted successfully.", success: true });
};

exports.getAllBlog = async (req, res) => {
  const result = await allBlog();

  if (!result) {
    res.json({ message: "Internal server error.", success: false });
    return;
  }

  res.json({
    message: "All blogs are fetched successfully.",
    data: result,
    success: true,
  });
};

exports.getBlogsForTable = async (req, res) => {
  const data = await getBlogInfoForTable(req.query);
  res.json(data);
};

exports.getTopicForTable = async (req, res) => {
  const data = await getTopicInfoForTable(req.query);
  res.json(data);
};
