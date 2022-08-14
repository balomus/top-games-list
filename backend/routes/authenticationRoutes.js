const express = require("express");
const { setAccessToken } = require("../controllers/accessTokenController");
const router = express.Router();
const {
    authenticate
} = require ("../controllers/authenticationController");

router.route('/').post(authenticate);

module.exports = router;