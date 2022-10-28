import React from "react";
import styled from "styled-components";
import { useGetBySearchQuery } from "../../api/ApiConfig";
import { useDispatch, useSelector } from "react-redux";
import Lottie from "react-lottie";
import assets from "../../assets";

import {
  selectFavourites,
  searchByName,
  allState,
  pushFavouritesAsync,
  handleFavourAction,
  wordingFavour,
  handleSearchAsync,
  setModal,
  rerender,
  setNextPage,
  setPreviousPage,
  setPage,
} from "../movieSlice";
import ModalDetail from "../../components/Modal/Modal";
import MoviesListData from "./MovieList";

const ListMoviePage = () => {
  const fav = useSelector(allState);
  const favouriteMovies = useSelector(selectFavourites);

  const dispatch = useDispatch();

  const inputRef = React.useRef();
  const [state, setState] = React.useState({
    selected: false,
    index: null,
    search: "",
    idDetail: "",
    isStopped: false,
    isPaused: false,
  });
  console.log("🚀 ~ file: index.jsx ~ line 31 ~ ListMoviePage ~ state", state);

  const latestSearch = fav?.latestSearch;
  const newLatestSearch = [...new Set(latestSearch)].slice(0, 5);

  const { data } = useGetBySearchQuery({
    search: fav?.search,
    page: fav?.page,
  });

  const handleKeyPress = (event) => {
    if (event.keyCode === 13) {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    dispatch(setPage(1));
    dispatch(handleSearchAsync(inputRef.current.value));
  };

  const handleChange = (event) => {
    setState((prev) => ({
      ...prev,
      search: event,
    }));
  };

  const handleModal = (value) => {
    if (!fav.modalDetail) {
      setState((prev) => ({
        ...prev,
        idDetail: value,
      }));
    } else {
      setState((prev) => ({
        ...prev,
        idDetail: "",
      }));
    }
    dispatch(setModal());
  };

  return (
    <div>
      <ModalDetail
        showed={fav.modalDetail}
        setHide={() => dispatch(setModal())}
        idDetail={state.idDetail}
      />
      <Wrapper>
        <div className="title">
          <p>Movie Database 🍿</p>
        </div>
        <div className="latest-search">
          <input
            ref={inputRef}
            value={state.search}
            onChange={(e) => handleChange(e.target.value)}
            onKeyDown={(e) => handleKeyPress(e)}
          />
        </div>
        <div className="latest-search">
          <span>Latest Search :</span>
          {newLatestSearch.map((val, i) => (
            <span
              onClick={() => handleChange(val)}
              className="badge badge-light"
              key={i}
            >
              {val}
            </span>
          ))}
        </div>
        <MoviesListData
          state={fav}
          data={data?.Search}
          handleModal={handleModal}
          nextPage={setNextPage}
          prevPage={setPreviousPage}
        />
        {/* <div className="wrapper-list">
          <div className="list">
            {data?.Search?.map((v) => (
              <MovieList>
                <span onClick={() => handleModal(v?.imdbID)}>{v?.Title}</span>
                <div onClick={() => dispatch(handleFavourAction(v))}>
                  <Lottie
                    options={defaultOptions}
                    height={50}
                    width={50}
                    isPaused={dispatch(wordingFavour(v, data))}
                    isStopped={dispatch(wordingFavour(v, data))}
                  />
                </div>
              </MovieList>
            ))}
          </div>
        </div> */}
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10vh;

  .title {
    display: flex;
    justify-content: center;
    font-weight: 700;
    font-size: 24px;
  }

  .latest-search {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0 0;
    gap: 10px;
    cursor: pointer;

    input {
      width: 50%;
      border: 2px solid #e9edf4;
      border-radius: 6px;
      height: 40px;
    }

    .badge {
      padding: 10px;
    }
  }

  .wrapper-list {
    margin-top: 20px;
    width: 100%;
    // animation-name: slide-in-right;
    // animation-duration: 4s;

    .slide-in-right {
      -webkit-animation: slide-in-right 0.5s
        cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
      animation: slide-in-right 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    }

    @-webkit-keyframes slide-in-right {
      0% {
        -webkit-transform: translateX(1000px);
        transform: translateX(1000px);
        opacity: 0;
      }
      100% {
        -webkit-transform: translateX(0);
        transform: translateX(0);
        opacity: 1;
      }
    }
    @keyframes slide-in-right {
      0% {
        -webkit-transform: translateX(1000px);
        transform: translateX(1000px);
        opacity: 0;
      }
      100% {
        -webkit-transform: translateX(0);
        transform: translateX(0);
        opacity: 1;
      }
    }

    .list {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(4, 1fr);
      grid-column-gap: 6px;
      grid-row-gap: 6px;
    }
  }
`;

const MovieCard = styled.div`
  display: flex;
  width: 180px;
  height: 240px;
  //   background: yellow;
  border: 1px solid;
  border-radius: 4px;
  position: relative;
  z-index: 30;

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -20;
  }

  &:hover {
    opacity: 0.7;
  }
`;

const MovieList = styled.div`
  display: flex;
  background: yellow;
  width: 100%;
  height: 60px;
  border-radius: 6px;
  align-items: center;
  padding: 0.5em;
  justify-content: space-between;
`;

export default ListMoviePage;
