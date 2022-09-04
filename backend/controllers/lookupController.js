const axios = require("axios");
const { response } = require("express");
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
                fields: name,platforms,cover;
                where cover != null;`;

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
        let listOfCovers = response.data.map(({ cover }) => cover);

        axios.post(`${serverAPI}lookup/cover/${listOfCovers.join(', ')}`)
        .then((coverResponse) => {
            for (i = 0; i < response.data.length; i++)
            {
                coverObj = coverResponse.data.filter(cover => {
                    return cover.game == response.data[i].id;
                });
                
                console.log(...coverObj);
                response.data[i].url = coverObj[0].url;
            }
            res.json(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    })
    .catch((error) => {
        console.log(error);
    })
    
})

// @desc Get cover(s) from API
// @route POST https://api.igdb.com/v4/covers
// @access Public
const getCover = asyncHandler(async (req, res) => {
    let token = await axios.get(`${serverAPI}accessToken`);
    token = token.data.access_token;

    let id = req.params.id;

    let data = `where id = (${id});
                fields: image_id,game;`;

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
        response.data.forEach(cover => {
            cover.url = "https://images.igdb.com/igdb/image/upload/t_720p/" + cover.image_id + ".jpg";
        });
        res.json(response.data);
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