import { createSlice } from "@reduxjs/toolkit";

export const movieSlice = createSlice({
  name: "movies",
  initialState: {
    favourites: [],
    latestSearch: [],
    search: "",
    favourSearch: "",
    modalDetail: false,
  },
  reducers: {
    setModal: (state, action) => {
      state.modalDetail = !state.modalDetail;
    },
    searchFavourByName: (state, action) => {
      state.favourSearch = action.payload;
    },
    searchByName: (state, action) => {
      if (action.payload !== "") {
        state.latestSearch.unshift(action.payload);
      }
      state.search = action.payload;
    },
    pushFavourites: (state, action) => {
      state.favourites.push(action.payload);
    },
    deleteFavourites: (state, action) => {
      state.favourites = state.favourites.filter(
        (item) => item.imdbID !== action.payload
      );
    },
  },
});

export const {
  pushFavourites,
  deleteFavourites,
  searchByName,
  searchFavourByName,
  setModal,
} = movieSlice.actions;

// function for thunk and async logic

export const pushFavouritesAsync = (value) => (dispatch, getState) => {
  const { movies } = getState();
  if (movies.favourites.some((v) => v === value)) {
    return false;
  } else {
    setTimeout(() => {
      dispatch(pushFavourites(value));
    }, 500);
  }
};

export const handleSearchAsync = (value) => (dispatch, getState) => {
  dispatch(searchByName(value));
};

export const handleFavourAction = (value) => (dispatch, getState) => {
  const { movies } = getState();
  if (movies?.favourites?.some((v) => v === value)) {
    dispatch(deleteFavourites(value?.imdbID));
  } else {
    dispatch(pushFavouritesAsync(value));
  }
};

export const wordingFavour = (value, data) => (dispatch, getState) => {
  const { movies } = getState();
  if (movies?.favourites?.some((v) => v === value)) {
    return false;
  } else {
    return true;
  }
};

export const selectFavourites = (state) => state?.movies?.favourites;
export const allState = (state) => state?.movies;

export default movieSlice.reducer;
