import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  allState,
  handleFavourAction,
  searchFavourByName,
  selectFavourites,
  wordingFavour,
} from "../movieSlice";

const FavouriteMovies = () => {
  const favourites = useSelector(selectFavourites);
  const movieState = useSelector(allState);

  const dispatch = useDispatch();

  const handleUpperCase = (value) => {
    return value[0].toUpperCase() + value.slice(1);
  };

  return (
    <Wrapper>
      <span>Your Favourites</span>
      <input onChange={(e) => dispatch(searchFavourByName(e.target.value))} />
      <div className="latest-search"></div>
      <div className="wrapper-list">
        <div className="list">
          {favourites.map((v) => (
            <Card>
              <div className="left">
                <span>{v?.Title}</span>
                <span>{v?.Year}</span>
                <span>{handleUpperCase(v?.Type)}</span>
              </div>
              <div className="right">
                <span onClick={() => dispatch(handleFavourAction(v))}>
                  {dispatch(wordingFavour(v)) ? "Fav" : "Un"}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 10px;
  align-items: center;
  padding: 20px;

  input {
    width: 50%;
    border: 2px solid #e9edf4;
    border-radius: 6px;
    height: 40px;
  }

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
    display: flex;
    justify-content: center;
    margin-top: 20px;
    width: 100%;
    height: 500px;
    overflow: scroll;

    .list {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(4, 1fr);
      grid-column-gap: 6px;
      grid-row-gap: 6px;
    }
  }
`;

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  height: 150px;
  width: 500px;
  border: 1px solid #e9edf4;
  border-radius: 6px;

  .left,
  .right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
  }
`;

export default FavouriteMovies;
