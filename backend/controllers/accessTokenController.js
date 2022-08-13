const asyncHandler = require('express-async-handler');
const AccessToken = require('../models/accessTokenModel');

// @desc Get accessToken
// @route GET /api/accessToken
// @access Public
const getAccessToken = asyncHandler(async (req, res) => {
    const accessToken = await AccessToken.find();

    res.status(200).json(accessToken);
})

// @desc Set accessToken
// @route POST /api/accessToken
// @access Public
const setAccessToken = asyncHandler(async (req, res) => {
    
})