
const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true
    },

    name: {
        type: String,
    },

    location: {
        type: String,
    },

    bands: [
        {
            type: Schema.Types.ObjectId,
            ref: "Band"
        }
    ],

    tickets: [
        {
            type: Schema.Types.ObjectId,
            ref: "Ticket"
        }
    ]
});

const User = model('User', userSchema);
module.exports = User;
