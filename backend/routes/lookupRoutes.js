const express = require("express");
const router = express.Router();
const {getGames, getCover, getPlatform} = require("../controllers/lookupController");

router.route('/games/:name').post(getGames);
router.route('/cover/:id').post(getCover);
router.route('/platforms').post(getPlatform);

module.exports = router;