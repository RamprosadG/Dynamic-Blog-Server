const adminRouter = require("./adminRoute");
const authRouter = require("./authRoute");
const userRouter = require("./userRoute");

const router = require("express").Router();

router.use("/admin", adminRouter);
router.use("/user", userRouter);
router.use("/", authRouter);

module.exports = router;
