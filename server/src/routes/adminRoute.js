const {
  getTopic,
  addTopic,
  updateTopic,
  deleteTopic,
} = require("../controllers/adminController");

const adminRouter = require("express").Router();

adminRouter.get("/getTopic", getTopic);
adminRouter.post("/addTopic", addTopic);
adminRouter.put("/updateTopic", updateTopic);
adminRouter.delete("/deleteTopic", deleteTopic);

adminRouter.get("/getBlog", getTopic);
adminRouter.post("/addBlog", addTopic);
adminRouter.put("/updateBlog", updateTopic);
adminRouter.delete("/deleteBlog", deleteTopic);

module.exports = adminRouter;
