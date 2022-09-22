import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import gameListService from "./gameListService";

const initialState = {
    gameLists: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}

// Create new gamelist
export const createGameList = createAsyncThunk(
    "gamelists/create",
    async (gameListData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await gameListService.createGameList(gameListData, token);
        } catch (error) {
            const message = 
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }  
);

// Get user gamelist
export const getGameLists = createAsyncThunk("gamelists/getAll", async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await gameListService.getGameLists(token);
        } catch (error) {
            const message = 
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }  
);

// Delete user gamelist
export const deleteGameList = createAsyncThunk(
    "gamelists/delete",
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await gameListService.deleteGameList(id, token);
        } catch (error) {
            const message = 
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }  
);

export const gameListSlice = createSlice({
    name: "gameList",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createGameList.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createGameList.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.gameLists.push(action.payload)
            })
            .addCase(createGameList.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = aciton.payload
            })
            .addCase(getGameLists.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getGameLists.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.gameLists = action.payload
            })
            .addCase(getGameLists.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = aciton.payload
            })
            .addCase(deleteGameList.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteGameList.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.gameLists = state.gameLists.filter(
                    (gameList) => gameList._id !== action.payload.id
                )
            })
            .addCase(deleteGameList.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = aciton.payload
            })
    }
});

export const { reset } = gameListSlice.actions;
export default gameListSlice.reducer;