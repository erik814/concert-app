const router = require('express').Router();

const { getBand, getShows } = require('../../controllers/seat-controller')

router.route('/band').post(getBand)
router.route('/shows').post(getShows)

module.exports = router;