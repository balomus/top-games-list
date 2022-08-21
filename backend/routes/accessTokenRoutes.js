const express = require("express");
const { setAccessToken, getAccessToken } = require("../controllers/accessTokenController");
const router = express.Router();

router.route('/').get(getAccessToken).post(setAccessToken);

module.exports = router;