const Ticket = require('../models/Ticket')
const Band = require('../models/Band');
const User = require('../models/User')

module.exports = {

    getAllTickets(req, res) {
        Ticket.find()
            .then((data) => res.json(data))
            .catch((err) => res.status(500).json(err));
    },

    getTicketsByUser(req, res) {
        const userId = req.params.userId;

        Ticket.find({ userId: userId })
            .then(tickets => {
                res.json({ tickets: tickets });
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ message: 'Server Error' });
            });
    },

    createTicket(req, res) {
        Ticket.create(req.body)
            .then((data) => 
                User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { tickets: data } },
                    { new: true }
                )
            )
            .then((user) => 
                !user
                    ? res.status(404).json({
                        message: "ticket created, but no user found",
                    })
                : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);

            });
    },    
}