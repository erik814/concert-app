const router = require('express').Router();
const userRoutes = require('./user-routes');
const seatRoutes = require('./seat-routes');
const bandRoutes = require('./band-routes');

router.use('/user', userRoutes);
router.use('/seat', seatRoutes);
router.use('/band', bandRoutes);

module.exports = router;
