const router = require('express').Router();

// Import any controllers needed here
const { getAllUsers, authUser, createUser, updateUser, verifyUser } = require('../../controllers/user-controller');

// Declare the routes that point to the controllers above
router.route('/').get(getAllUsers).post(createUser);
router.route('/auth').post(authUser);
router.route('/verify').post(verifyUser);
router.route('/:id').put(updateUser);

module.exports = router;
