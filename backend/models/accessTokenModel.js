const mongoose = require('mongoose');

const accessTokenSchema = mongoose.Schema({
    access_token: {
        type: String,
        required: [true, 'Please add an access_token value']
    },
    expires_in: {
        type: Number,
        required: [true, 'Please add an expires_in value']
    },
    token_type: {
        type: String,
        required: [true, 'Please add a token_type value']
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('AccessToken', accessTokenSchema);