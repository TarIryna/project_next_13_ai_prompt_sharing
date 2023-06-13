import { createSlice } from "@reduxjs/toolkit";
import { ProductsService } from "@store/services/products";

const initialState = {
  query: "",
  page: 1,
  pages: 1,
  quantity: 24,
  season: null,
  gender: null,
  products: [],
  isLoading: false,
  isError: false,
};

export const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    changeGames: (state, action) => {
      state.games = action.payload;
    },
    changePage: (state, action) => {
      state.page = action.payload;
    },
    changePages: (state, action) => {
      state.pages = action.payload;
    },
    changeQauntity: (state, action) => {
      state.page = 1;
      state.quantity = action.payload;
    },
    changeProvider: (state, action) => {
      state.collection = null;
      state.query = "";
      state.page = 1;
      state.provider = action.payload;
    },
    changeCollection: (state, action) => {
      state.provider = null;
      state.query = "";
      state.page = 1;
      state.collection = action.payload;
    },
    changeQuery: (state, action) => {
      state.provider = null;
      state.collection = null;
      state.page = 1;
      state.query = action.payload;
    },
    changeToInitial: (state, action) => {
      state.page = 1;
      state.collection = null;
      state.provider = null;
      state.query = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GamesService.fetchGames.pending, (state) => {
      state.isLoading = true;
      state.isError = null;
    });
    builder.addCase(GamesService.fetchGames.fulfilled, (state, action) => {
      state.isLoading = false;
      const result =
        state.query.length > 0 ? action.payload.result.games : action.payload;
      if (state.page === 1) {
        state.games = result.result;
        state.pages = result.pages;
      }
      if (state.page > 1) {
        state.games = [...state.games, ...result.result];
        state.pages = result.pages;
      }
    });
    builder.addCase(GamesService.fetchGames.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
      state.games = [];
    });
  },
});

export const {
  changePage,
  changePages,
  changeQauntity,
  changeCollection,
  changeProvider,
  changeQuery,
  changeGames,
  changeToInitial,
} = gamesSlice.actions;
