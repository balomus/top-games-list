import axios from 'axios';

const API_URL = '/api/gamelists/';

// Create new gamelist
const createGameList = async (gameListData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, gameListData, config);

    return response.data;
}

// Get user gamelists
const getGameLists = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config);
    
    return response.data;
}

// Delete user gamelist
const deleteGameList = async (gameListId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + gameListId, config);

    return response.data;
}

// Update user gamelist
const updateGameList = async (gameListId, token) => {
    console.log("TOKEN IS " + token)
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL + gameListId, config);

    return response.data;
}

const gameListService = {
    createGameList,
    getGameLists,
    deleteGameList,
    updateGameList,
}

export default gameListService;