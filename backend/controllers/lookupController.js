const axios = require("axios");
const asyncHandler = require("express-async-handler");
const { getAccessToken } = require("./accessTokenController");

const serverAPI = `http://localhost:${process.env.PORT}/api/`;
const igdbAPI = "https://api.igdb.com/v4/";

// @desc Get games from API
// @route POST https://api.igdb.com/v4/games/:name
// @access Public
const getGames = asyncHandler(async (req, res) => {
    let token = await axios.get(`${serverAPI}accessToken`);
    token = token.data.access_token;
    // console.log(token);

    let name = req.params.name;

    let data = `search: "${name}";
                fields: name,platforms,cover;`;

    axios({
        url: igdbAPI + 'games',
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Client-ID': process.env.TWITCH_CLIENT_ID,
            'Authorization': `Bearer ${token}`
        },
        data: data
    })
    .then((response) => {
        console.log(response.data);
        // response.data.forEach(game => {
        //     axios({
        //         url: 
        //     })
        // });
        res.json(response.data);
    })
    .catch((error) => {
        console.log(error);
    })
    
})

// @desc Get cover from API
// @route POST https://api.igdb.com/v4/covers
// @access Public
const getCover = asyncHandler(async (req, res) => {
    let token = await axios.get(`${serverAPI}accessToken`);
    token = token.data.access_token;

    let id = req.params.id;

    let data = `where id = ${id};
                fields: image_id;
                limit 1;`;

    axios({
        url: igdbAPI + 'covers',
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Client-ID': process.env.TWITCH_CLIENT_ID,
            'Authorization': `Bearer ${token}`
        },
        data: data
    })
    .then((response) => {
        console.log(response.data);
        res.json("https://images.igdb.com/igdb/image/upload/t_720p/" + response.data[0].image_id + ".jpg");
    })
    .catch((error) => {
        console.log(error);
        res.json(error);
    })
})

module.exports = {
    getGames,
    getCover
}