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
  setIsAnimate,
} from "../movieSlice";
import ModalDetail from "../../components/Modal/Modal";
import MoviesListData from "./MovieList";

const ListMoviePage = () => {
  const fav = useSelector(allState);
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

  const latestSearch = fav?.latestSearch;
  const newLatestSearch = [...new Set(latestSearch)].slice(0, 5);

  const { data, isError } = useGetBySearchQuery({
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
    dispatch(setIsAnimate(true));
  };

  const handleChange = (event) => {
    if (event === "") {
      dispatch(setIsAnimate(false));
    }

    setState((prev) => ({
      ...prev,
      search: event,
    }));
    dispatch(setIsAnimate(false));
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
    setTimeout(() => {
      dispatch(setModal());
    }, 700);
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
            placeholder="Search by Title"
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
          data={data}
          handleModal={handleModal}
          nextPage={setNextPage}
          prevPage={setPreviousPage}
        />
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
`;

export default ListMoviePage;
