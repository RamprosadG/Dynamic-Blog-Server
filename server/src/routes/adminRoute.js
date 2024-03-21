const getAdmin = require('../controllers/adminController');


const adminRouter = require('express').Router();

adminRouter.get('/', getAdmin);

module.exports = adminRouter;