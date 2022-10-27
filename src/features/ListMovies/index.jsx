import React from "react";
import styled from "styled-components";
import { useGetBySearchQuery } from "../../api/ApiConfig";
import { useDispatch, useSelector } from "react-redux";

import {
  selectFavourites,
  searchByName,
  allState,
  pushFavouritesAsync,
  handleFavourAction,
  wordingFavour,
  handleSearchAsync,
  setModal,
} from "../movieSlice";
import ModalDetail from "../../components/Modal/Modal";

const ListMoviePage = () => {
  const fav = useSelector(allState);
  console.log("🚀 ~ file: index.jsx ~ line 19 ~ ListMoviePage ~ fav", fav);
  const favouriteMovies = useSelector(selectFavourites);
  const dispatch = useDispatch();

  const inputRef = React.useRef();
  const [state, setState] = React.useState({
    selected: false,
    index: null,
    search: "",
    idDetail: "",
  });
  console.log("🚀 ~ file: index.jsx ~ line 31 ~ ListMoviePage ~ state", state);

  const latestSearch = fav?.latestSearch;
  const newLatestSearch = [...new Set(latestSearch)].slice(0, 5);

  const { data } = useGetBySearchQuery({ search: fav?.search });

  const handleKeyPress = (event) => {
    if (event.keyCode === 13) {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
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
        <p>This is List movie page</p>
        <input
          ref={inputRef}
          value={state.search}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={(e) => handleKeyPress(e)}
        />
        <div className="latest-search">
          <span>Latest Search :</span>
          {newLatestSearch.map((val, i) => (
            <span className="badge badge-light" key={i}>
              {val}
            </span>
          ))}
        </div>
        <div className="wrapper-list">
          <div className="list">
            {data?.Search?.map((v) => (
              <MovieList>
                <span onClick={() => handleModal(v?.imdbID)}>{v?.Title}</span>
                <span onClick={() => dispatch(handleFavourAction(v))}>
                  {dispatch(wordingFavour(v, data)) ? "Fav" : "Un"}
                </span>
              </MovieList>
            ))}
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10vh;

  .latest-search {
    display: flex;
    align-items: center;
    margin: 10px 0 0;
    gap: 10px;

    .badge {
      padding: 10px;
    }
  }

  .wrapper-list {
    margin-top: 20px;
    width: 100%;

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
