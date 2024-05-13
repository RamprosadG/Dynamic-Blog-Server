const { getOneBlogById } = require("../controllers/blogController");
const { getSidebarData } = require("../controllers/userController");

const userRouter = require("express").Router();

userRouter.get("/sidebar", getSidebarData);
userRouter.get("/blog/single/:id", getOneBlogById);

module.exports = userRouter;
