const router = require('express').Router();

const { createBand, getAllBands } = require('../../controllers/band-controller')

router.route('/').get(getAllBands).post(createBand)


module.exports = router;