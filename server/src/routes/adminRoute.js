const {
  getTopic,
  getAllTopic,
  addTopic,
  updateTopic,
  deleteTopic,
  getBlog,
  addBlog,
  updateBlog,
  deleteBlog,
  getBlogsForTable,
  getTopicForTable,
} = require("../controllers/adminController");

const adminRouter = require("express").Router();

adminRouter.get("/topic/single/:id", getTopic);
adminRouter.post("/topic/create", addTopic);
adminRouter.put("/topic/update:/id", updateTopic);
adminRouter.delete("/topic/remove/:id", deleteTopic);
adminRouter.get("/topic/all", getAllTopic);

adminRouter.get("/blog/single/:id", getBlog);
adminRouter.post("/blog/create", addBlog);
adminRouter.put("/blog/update/:id", updateBlog);
adminRouter.delete("/blog/remove/:id", deleteBlog);

adminRouter.get("/blog/table", getBlogsForTable);
adminRouter.get("/topic/table", getTopicForTable);

module.exports = adminRouter;
