const { getOneBlogById } = require("../controllers/blogController");
const {
  getSidebarData,
  getBlogForPagination,
} = require("../controllers/userController");

const userRouter = require("express").Router();

userRouter.get("/sidebar", getSidebarData);
userRouter.get("/blog/single/:id", getOneBlogById);
userRouter.get("/blog/pagination", getBlogForPagination);

module.exports = userRouter;
