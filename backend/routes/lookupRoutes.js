const express = require("express");
const router = express.Router();
const {getGames} = require("../controllers/lookupController");

router.route('/:name').post(getGames);

module.exports = router;