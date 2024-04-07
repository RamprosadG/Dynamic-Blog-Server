const {
  fetchSidebarData,
  getOneBlogbyIdFromDatabase,
  getRandomBlogIdFromDatabase,
} = require("../models/blogModel");
const { formatSidebarData } = require("../utils/utils");

exports.getSidebarData = async (req, res) => {
  const result = await fetchSidebarData(req.query);

  if (!result) {
    return res.json({ message: "Internal server error.", success: false });
  }
  const sidebarData = await formatSidebarData(result);

  res.json({
    message: "Fetched the sidebar data successfully.",
    data: sidebarData,
    success: true,
  });
};

exports.getOneBlogbyId = async (req, res) => {
  const result = await getOneBlogbyIdFromDatabase(req.query);

  if (!result) {
    return res.json({ message: "Internal server error.", success: false });
  }

  res.json({
    message: "Fetched the blog successfully.",
    data: result[0],
    success: true,
  });
};

exports.getRandomBlogId = async (req, res) => {
  const result = await getRandomBlogIdFromDatabase();

  if (!result) {
    return res.json({ message: "Internal server error.", success: false });
  }

  res.json({
    message: "Fetched the blog successfully.",
    data: result[0],
    success: true,
  });
};
