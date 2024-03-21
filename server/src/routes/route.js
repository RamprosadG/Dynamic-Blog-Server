const router = require('express').Router();
const adminRouter = require('./adminRoute');
const userRouter = require('./userRoute');

router.use('/admin', adminRouter);
router.use('/user', userRouter);

router.get('/', (req, res) => {
    res.send('Home page');
});

module.exports = router;