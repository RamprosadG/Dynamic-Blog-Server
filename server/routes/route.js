const router = require('express').Router();

const adminRouter = require('./adminRoute/adminRoute');
const userRouter = require('./userRoute/userRoute');

router.use('/admin', adminRouter);
router.use('/user', userRouter);

router.get('/', (req, res) => {
    res.send('Home page');
});

module.exports = router;