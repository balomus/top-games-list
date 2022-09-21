const asyncHandler = require('express-async-handler');

const GameList = require('../models/gameListModel');
const User = require('../models/userModel');

// @desc Get GameLists
// @route GET /api/gamelists
// @access Private
const getGameLists = asyncHandler(async (req, res) => {
    const gameLists = await GameList.find({ user: req.user.id });

    res.status(200).json(gameLists);
});

// @desc Set GameLists
// @route POST /api/gamelists
// @access Private
const setGameList = asyncHandler(async (req, res) => {
    if(!req.body.title) {
        res.status(400);
        throw new Error('Please add a title field');
    }
    if(!req.body.games) {
        res.status(400);
        throw new Error('Please add some games');
    }
    if (!req.body.description) {
        res.status(400);
        throw new Error('Please add a description')
    }

    const gameList = await GameList.create({
        title: req.body.title,
        games: req.body.games,
        description: req.body.description,
    })

    res.status(200).json(gameList);
})

// @desc Update GameLists
// @route PUT /api/gamelists/:id
// @access Private
const updateGameList = asyncHandler(async (req, res) => {
    const gameList = await GameList.findById(req.params.id);

    if (!gameList) {
        res.status(400);
        throw new Error('GameList not found');
    }

    // Check for user
    if (!req.user) {
        res.status(401);
        throw new Error('User not found');
    }

    //Make sure the logged in user matches the gameList user
    if (gameList.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    const updatedGameList = await GameList.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedGameList);
})

// @desc Delete GameLists
// @route DELETE /api/gamelists/:id
// @access Private
const deleteGameList = asyncHandler(async (req, res) => {
    const gameList = await GameList.findById(req.params.id);

    if (!gameList) {
        res.status(400);
        throw new Error('GameList not found');
    }

    // Check for user
    if (!req.user) {
        res.status(401);
        throw new Error('User not found');
    }

    // Make sure the logged in user matches the gameList user
    if (gameList.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    await gameList.remove();

    res.status(200).json({ id: req.params.id });
})

module.exports = {
    getGameLists,
    setGameList,
    updateGameList,
    deleteGameList,
}