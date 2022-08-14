const asyncHandler = require('express-async-handler');
const AccessToken = require('../models/accessTokenModel');
const axios = require('axios');

// @desc Get accessToken
// @route GET /api/accessToken
// @access Public
const getAccessToken = asyncHandler(async (req, res) => {
    const accessToken = await (await AccessToken.find().sort({ $natural: -1 }).limit(1))[0];

    axios.get("https://id.twitch.tv/oauth2/validate", {
        headers: {
            'Client-ID': process.env.TWITCH_CLIENT_ID,
            'Authorization': `Bearer ${accessToken.access_token}`
        }
    })
    .then((response) => {
        console.log("Token still valid, no change needed");
        res.status(200).json(accessToken);
    })
    .catch((error) => {
        console.log("Token is no longer valid, updating token");
        setAccessToken(req, res);
    })

    // res.status(200).json(accessToken);
})

// @desc Set accessToken
// @route POST /api/accessToken
// @access Public
const setAccessToken = async (req, res) => {
    axios.post(`https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=${process.env.GRANT_TYPE}`)
    .then(asyncHandler(async (response) => {
        const token = await AccessToken.create(response.data);
        res.json(token);
    }))
    .catch((error) => {
        console.log(error);
    })
};

// @desc Validate accessToken
// @route GET /api/accessToken/:token
// @access Public
const validateAccessToken = asyncHandler(async (req, res) => {
    const token = await AccessToken.findOne({ "access_token": req.params.token })
    // const token = await AccessToken.find().select({ access_token: req.params.token });
    // console.log(token);
    // res.json(token);

    axios.get("https://id.twitch.tv/oauth2/validate", {
        headers: {
            'Client-ID': process.env.TWITCH_CLIENT_ID,
            'Authorization': `Bearer ${token.access_token}`
        }
    })
    .then((response) => {
        console.log(response.status);
        res.json(token);
    })
    .catch((error) => {
        setAccessToken(req, res);
        // console.log(error.response.status);
        // res.json(error.response.status);
    })
})

const checkIfValid = async (token) => {
    console.log("token is " + token)
    // let valid = null;
    await axios.get("https://id.twitch.tv/oauth2/validate", {
        headers: {
            'Client-ID': process.env.TWITCH_CLIENT_ID,
            'Authorization': `Bearer ${token.access_token}`
        }
    })
    .then(() => {
        return true;
    })
    .catch((error) => {
        return false;
    })
    // return valid;
}

module.exports = {
    getAccessToken,
    setAccessToken,
    validateAccessToken
}