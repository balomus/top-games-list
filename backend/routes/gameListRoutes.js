const express = require("express");
const router = express.Router();
const {
    getGameLists,
    getOneGameList,
    setGameList,
    updateGameList,
    deleteGameList,
    getRecentGameLists,
} = require("../controllers/gameListController");

const {protect} = require('../middleware/authMiddleware');

router.route('/').get(protect, getGameLists).post(protect, setGameList);
router.route('/recent').get(getRecentGameLists);
router.route('/:id').delete(protect, deleteGameList).put(protect, updateGameList).get(getOneGameList);

module.exports = router;