const express = require("express");
const router = express.Router();
const {getGames, getCover, getPlatform, getInitialGames} = require("../controllers/lookupController");

router.route('/games/:name').post(getGames);
router.route('/cover/:id').post(getCover);
router.route('/platforms').post(getPlatform);
router.route('/initialgames').post(getInitialGames);

module.exports = router;