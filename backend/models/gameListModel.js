const mongoose = require('mongoose');

const gameListSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    title: {
        type: String,
        required: [true, 'Please add a title']
    },
    games: [
        {
            cover: Number,
            id: Number,
            name: String,
            platforms: [String],
            url: String,
        }
    ],
    description: {
        type: String,
        required: [true, 'Please add a description of this game list']
    },
}, {
    timestamps: true,
})

module.exports = mongoose.model('GameList', gameListSchema);