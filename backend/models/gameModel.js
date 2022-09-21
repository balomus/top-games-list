const mongoose = require('mongoose');

const gameSchema = ({
    id: Number,
    cover: Number,
    name: String,
    platforms: [Number],
    url: String,
}, {
    timestamps: true,
})

module.exports = mongoose.model('Game', gameSchema);