const router = require('express').Router();
const userRoutes = require('./user-routes');
const seatRoutes = require('./seat-routes');

router.use('/user', userRoutes);
router.use('/seat', seatRoutes);

module.exports = router;
