const userRouter = require('express').Router();

userRouter.get('/', (req, res) => {
    res.status(200).send("User page");
});

module.exports = userRouter;