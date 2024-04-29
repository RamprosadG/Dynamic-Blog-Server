const {
  getSidebarData,
  getOneBlogbyId,
  getRandomBlogId,
} = require("../controllers/userController");

const userRouter = require("express").Router();

userRouter.get("/blog/all/sidebar", getSidebarData);
userRouter.get("/blog/:id", getOneBlogbyId);
userRouter.get("/blog/random", getRandomBlogId);

module.exports = userRouter;
