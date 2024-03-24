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
} = require("../controllers/adminController");

const adminRouter = require("express").Router();

adminRouter.get("/getTopic", getTopic);
adminRouter.post("/addTopic", addTopic);
adminRouter.put("/updateTopic", updateTopic);
adminRouter.delete("/deleteTopic", deleteTopic);
adminRouter.get("/getAllTopic", getAllTopic);

adminRouter.get("/getBlog", getBlog);
adminRouter.post("/addBlog", addBlog);
adminRouter.put("/updateBlog", updateBlog);
adminRouter.delete("/deleteBlog", deleteBlog);

module.exports = adminRouter;
