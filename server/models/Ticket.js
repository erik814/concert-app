
const { Schema, model } = require('mongoose');

const ticketSchema = new Schema({
    name: {
        type: String,
    },
    price: {
        type: Number,
    },
    userId: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ]
})

const Ticket = model('Ticket', ticketSchema);
module.exports = Ticket;