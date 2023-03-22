const router = require('express').Router();

const { createBand, getAllBands, getBandsByUser } = require('../../controllers/band-controller')

router.route('/').get(getAllBands).post(createBand)
router.route('/:userId').get(getBandsByUser)

module.exports = router;