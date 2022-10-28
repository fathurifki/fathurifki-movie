import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  allState,
  handleFavourAction,
  searchFavourByName,
  selectFavourites,
  setModal,
  wordingFavour,
} from "../movieSlice";
import Lottie from "react-lottie";
import assets from "../../assets";
import ModalDetail from "../../components/Modal/Modal";

const FavouriteMovies = () => {
  const favourites = useSelector(selectFavourites);
  const movieState = useSelector(allState);
  const dispatch = useDispatch();

  const [state, setState] = React.useState({
    idDetail: "",
  });

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: assets.love,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleUpperCase = (value) => {
    return value && value[0]?.toUpperCase() + value.slice(1);
  };

  const handleModal = (value) => {
    if (!movieState.modalDetail) {
      setState((prev) => ({
        ...prev,
        idDetail: value,
      }));
    } else {
      setState((prev) => ({
        ...prev,
        idDetail: "",
        delete: false,
      }));
    }
    dispatch(setModal());
  };

  return (
    <div>
      <ModalDetail
        showed={movieState.modalDetail}
        setHide={() => dispatch(setModal())}
        idDetail={state.idDetail}
      />
      <Wrapper>
        <div className="title">
          <span>Your Favourites 🍿</span>
        </div>
        <div className="wrapper-list">
          <div className="list">
            {favourites.map((v) => (
              <Card>
                <div className="left" onClick={() => handleModal(v?.imdbID)}>
                  <span>{v?.Title}</span>
                  <span>{v?.Year}</span>
                  <span>{handleUpperCase(v?.Type)}</span>
                </div>
                <div className="right">
                  <div onClick={() => dispatch(handleFavourAction(v))}>
                    <Lottie options={defaultOptions} height={80} width={80} />
                  </div>
                </div>
              </Card>
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
  height: 100%;
  gap: 10px;
  align-items: center;
  padding: 20px;

  .title {
    display: flex;
    justify-content: flex-start;
    font-weight: 700;
    font-size: 24px;
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
