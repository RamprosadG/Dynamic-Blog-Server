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
    return res.json({ message: "Id is required.", success: false });
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
    data: result,
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
  const id = req.body.id;
  const name = req.body.name;

  if (!name) {
    return res.json({ message: "Name is required." });
  }

  const existingName = await getTopicName(name);

  if (existingName === name) {
    return res.json({ message: "The topic already exists." });
  }

  const topic = getTopicById(id);

  if (!topic) {
    return res.json({ message: "Internal server error" });
  }

  if (!topic.length) {
    return res.json({ message: "The topic is not found." });
  }
  const result = updateExistingTopic(req.body);

  if (!result) {
    return res.json({ message: "Internal server error" });
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
  const existingTitle = await getBlogTitle(title);

  if (existingTitle === title) {
    return res.json({ message: "The title already exists.", success: false });
  }

  const blog = await getBlogById(id);
  console.log(blog);

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
