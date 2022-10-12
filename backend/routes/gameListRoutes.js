const express = require("express");
const router = express.Router();
const {
    getGameLists,
    getOneGameList,
    setGameList,
    updateGameList,
    deleteGameList,
} = require("../controllers/gameListController");

const {protect} = require('../middleware/authMiddleware');

router.route('/').get(protect, getGameLists).post(protect, setGameList);
router.route('/:id').delete(protect, deleteGameList).put(protect, updateGameList).get(getOneGameList);

module.exports = router;