const express = require("express");
const router = express.Router();
const {getGames, getCover} = require("../controllers/lookupController");

router.route('/games/:name').post(getGames);
router.route('/cover/:id').post(getCover);

module.exports = router;