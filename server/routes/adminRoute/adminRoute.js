const adminRouter = require('express').Router();

adminRouter.get('/', (req, res) => {
    res.status(200).send("Admin page");
});

module.exports = adminRouter;