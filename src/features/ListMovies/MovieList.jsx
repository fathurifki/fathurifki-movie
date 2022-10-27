import React from "react";
import styled from "styled-components";
import assets from "../../assets";
import Lottie from "react-lottie";
import { useDispatch, useSelector } from "react-redux";
import { handleFavourAction, wordingFavour } from "../movieSlice";

const MoviesListData = ({ data, handleModal }) => {
  const dispatch = useDispatch();
  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: assets.love,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Wrapper>
      <div className="wrapper-list">
        <div className="list">
          {data?.map((v) => (
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
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .wrapper-list {
    margin-top: 20px;
    width: 100%;
    animation-name: slide-in-right;
    animation-duration: 2s;

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

const MovieList = styled.div`
  display: flex;
  background: white;
  width: 100%;
  height: 60px;
  border: 1px solid #e9edf4;
  border-radius: 6px;
  align-items: center;
  padding: 0.5em;
  justify-content: space-between;
  box-shadow: 0px 6px 17px -4px rgba(0, 0, 0, 0.52);
  -webkit-box-shadow: 0px 6px 17px -4px rgba(0, 0, 0, 0.52);
  -moz-box-shadow: 0px 6px 17px -4px rgba(0, 0, 0, 0.52);
`;

export default MoviesListData;
