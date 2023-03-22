
const { Schema, model } = require('mongoose');

const bandSchema = new Schema({
    name: {
        type: String,
    },
    userId: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ]
})

const Band = model('Band', bandSchema);
module.exports = Band;