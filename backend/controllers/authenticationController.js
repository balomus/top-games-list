const asyncHandler = require("express-async-handler");
const axios = require("axios").default;

// const authenticate = asyncHandler(async (req, res) => {
//     let response = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=${process.env.GRANT_TYPE}`);
//     let data = await response.json();
//     res.status(200).json(data);
// });

// const authenticate = async (req, res) => {
//     try {
//         const response = await axios.post(`https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=${process.env.GRANT_TYPE}`);
//         console.log(response.data);
//         res.json(response.data);

//         // res.status(200).json(response)
//     } catch (error) {
//         console.log(error);
//     }
// };

const authenticate = async (req, res) => {
    axios.post(`https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=${process.env.GRANT_TYPE}`)
    .then((response) => {
        console.log(response);
        res.json(response.data.access_token);
    })
    .catch((error) => {
        console.log(error);
    })
};

module.exports = {
    authenticate
}

//https://www.mariokandut.com/how-to-make-an-API-request-in-Node-javascript/