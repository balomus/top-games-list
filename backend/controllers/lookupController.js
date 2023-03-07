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

    let data = `limit: 24;
                search: "${name}";
                fields: name,platforms,cover;
                where cover != null & platforms != null & aggregated_rating != null;`;

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

        if (listOfCovers.length !== 0)
        {
            axios.post(`${serverAPI}lookup/cover/${listOfCovers.join(', ')}`)
            .then((coverResponse) => {
                for (i = 0; i < response.data.length; i++)
                {
                    coverObj = coverResponse.data.filter(cover => {
                        return cover.game == response.data[i].id;
                    });
                    
                    // console.log(...coverObj);
                    response.data[i].url = coverObj[0].url;
                }
                res.json(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
        }
        else
        {
            res.json(response.data);
        }

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

    let data = `limit 500;
                where id = (${id});
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
        console.log(response);
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

// @desc Get platform(s) from API
// @route POST https://api.igdb.com/v4/platforms
// @access Public
const getPlatform = asyncHandler(async (req, res) => {
    let token = await axios.get(`${serverAPI}accessToken`);
    token = token.data.access_token;

    let data =  `limit: 500;
                fields: id,name,abbreviation;`
    axios({
        url: igdbAPI + 'platforms',
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Client-ID': process.env.TWITCH_CLIENT_ID,
            'Authorization': `Bearer ${token}`
        },
        data: data
    })
    .then((response) => {
        res.json(response.data);
    })
    .catch((error) => {
        console.log(error);
        res.json(error);
    })
})

// @desc Get top 24 games from API
// @route POST https://api.igdb.com/v4/games
// @access Public
const getInitialGames = asyncHandler(async (req, res) => {
    let token = await axios.get(`${serverAPI}accessToken`);
    token = token.data.access_token;
    // console.log(token);

    let data = `fields: name,platforms,cover;
                sort aggregated_rating desc;
                where cover != null & platforms != null & aggregated_rating_count > 20 & aggregated_rating != null;
                limit 24;`;

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

        if (listOfCovers.length !== 0)
        {
            axios.post(`${serverAPI}lookup/cover/${listOfCovers.join(', ')}`)
            .then((coverResponse) => {
                for (i = 0; i < response.data.length; i++)
                {
                    coverObj = coverResponse.data.filter(cover => {
                        return cover.game == response.data[i].id;
                    });
                    
                    // console.log(...coverObj);
                    response.data[i].url = coverObj[0].url;
                }
                res.json(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
        }
        else
        {
            res.json(response.data);
        }

    })
    .catch((error) => {
        console.log(error);
    })
    
})

module.exports = {
    getGames,
    getCover,
    getPlatform,
    getInitialGames
}