const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    phone: {
        type: String,
        required: true,
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model('Contact', contactSchema);