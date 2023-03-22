const Band = require('../models/Band');
const User = require('../models/User')

module.exports = {

    getAllBands(req, res) {
        Band.find()
            .then((data) => res.json(data))
            .catch((err) => res.status(500).json(err));
    },

    createBand(req, res) {
        Band.create(req.body)
            .then((data) => 
                User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { bands: data } },
                    { new: true }
                )
            )
            .then((user) => 
                !user
                    ? res.status(404).json({
                        message: "Feedback created, but no user found",
                    })
                : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);

            });
    },    
}