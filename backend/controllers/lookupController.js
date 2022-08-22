const axios = require("axios");
const asyncHandler = require("express-async-handler");
const { getAccessToken } = require("./accessTokenController");

const serverAPI = `http://localhost:${process.env.PORT}/api/`;
const igdbAPI = "https://api.igdb.com/v4/games/";

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

    let config = {
        headers: {
            'Client-ID': process.env.TWITCH_CLIENT_ID,
            'Authorization': `Bearer ${token}`
        }
    }

    axios({
        url: igdbAPI,
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Client-ID': process.env.TWITCH_CLIENT_ID,
            'Authorization': `Bearer ${token}`
        },
        data: data
    })
    .then((response) => {
        // console.log(response.data);
        res.json(response.data);
    })
    .catch((error) => {
        console.log(error);
    })

    // axios.post(igdbAPI, data, config)
    // .then((response) => {
    //     // res.json(response);
    //     console.log('test')
    //     console.log(response);
    //     res.json(response.data);
    // })
    // .catch((error) => {
    //     console.log(error);
    // })
    
})

module.exports = {
    getGames
}