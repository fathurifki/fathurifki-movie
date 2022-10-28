import { createSlice } from "@reduxjs/toolkit";

export const movieSlice = createSlice({
  name: "movies",
  initialState: {
    favourites: [],
    latestSearch: [],
    search: "",
    favourSearch: "",
    modalDetail: false,
    isStoppedLottie: true,
    isPausedLottie: true,
    latestData: {},
    page: 1,
  },
  reducers: {
    setLatestData: (state, action) => {
      state.latestData = action.payload;
    },
    setNextPage: (state) => {
      state.page += 1;
    },
    setPreviousPage: (state) => {
      state.page -= 1;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setLottieStop: (state, action) => {
      state.isStoppedLottie = action.payload;
    },
    setLottiePaused: (state, action) => {
      state.isPausedLottie = action.payload;
    },
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
        (item) => item?.imdbID !== action.payload
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
  setLottiePaused,
  setLottieStop,
  setNextPage,
  setPreviousPage,
  setPage,
  setLatestData,
} = movieSlice.actions;

// function for async logic

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
  dispatch(setLatestData(value));
  if (movies?.favourites?.some((v) => v === value)) {
    dispatch(deleteFavourites(value?.imdbID));
  } else {
    dispatch(pushFavouritesAsync(value));
  }
};

export const wordingFavour = (value) => (dispatch, getState) => {
  const { movies } = getState();
  if (movies?.favourites?.some((v) => v === value)) {
    dispatch(setLottiePaused(false));
    dispatch(setLottieStop(false));
    return false;
  } else {
    return true;
  }
};

export const rerender = () => {
  return true;
};

export const selectFavourites = (state) => state?.movies?.favourites;
export const allState = (state) => state?.movies;

export default movieSlice.reducer;
