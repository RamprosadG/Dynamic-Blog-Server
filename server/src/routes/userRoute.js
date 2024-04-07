const {
  getSidebarData,
  getOneBlogbyId,
  getRandomBlogId,
} = require("../controllers/userController");

const userRouter = require("express").Router();

userRouter.get("/getSidebarData", getSidebarData);
userRouter.get("/getOneBlogbyId", getOneBlogbyId);
userRouter.get("/getRandomBlogId", getRandomBlogId);

module.exports = userRouter;
