const express = require("express");
const { setAccessToken, getAccessToken, validateAccessToken } = require("../controllers/accessTokenController");
const router = express.Router();

router.route('/').get(getAccessToken).post(setAccessToken);
router.route('/:token').get(validateAccessToken);

module.exports = router;