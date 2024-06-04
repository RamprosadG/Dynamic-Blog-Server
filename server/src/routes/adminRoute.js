const {
  createBlog,
  getOneBlogById,
  getAllBlog,
  updateBlog,
  publishBlog,
  unpublishBlog,
  deleteBlog,
  getBlogForTable,
} = require("../controllers/blogController");
const {
  createTopic,
  getOneTopicById,
  getAllTopic,
  updateTopic,
  deleteTopic,
  getTopicForTable,
} = require("../controllers/topicController");
const { createBlogSchema, updateBlogSchema } = require("../schema/blogSchema");
const {
  createTopicSchema,
  updateTopicSchema,
} = require("../schema/topicSchema");
const validateRequest = require("../utils/zodValidation");

const adminRouter = require("express").Router();

adminRouter.post(
  "/topic/create",
  validateRequest(createTopicSchema),
  createTopic
);
adminRouter.get("/topic/single/:id", getOneTopicById);
adminRouter.get("/topic/all", getAllTopic);
adminRouter.put(
  "/topic/update/:id",
  validateRequest(updateTopicSchema),
  updateTopic
);
adminRouter.delete("/topic/remove/:id", deleteTopic);

adminRouter.post("/blog/create", validateRequest(createBlogSchema), createBlog);
adminRouter.get("/blog/single/:id", getOneBlogById);
adminRouter.get("/blog/all/:option?", getAllBlog);
adminRouter.put(
  "/blog/update/:id",
  validateRequest(updateBlogSchema),
  updateBlog
);
adminRouter.patch("/blog/update/publish/:id", publishBlog);
adminRouter.patch("/blog/update/unpublish/:id", unpublishBlog);
adminRouter.delete("/blog/remove/:id", deleteBlog);

adminRouter.get("/blog/table", getBlogForTable);
adminRouter.get("/topic/table", getTopicForTable);

module.exports = adminRouter;
