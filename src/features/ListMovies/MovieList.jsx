import React from "react";
import styled from "styled-components";
import assets from "../../assets";
import Lottie from "react-lottie";
import { useDispatch } from "react-redux";
import { handleFavourAction, setIsAnimate, wordingFavour } from "../movieSlice";

const defaultOptions = {
  loop: false,
  autoplay: false,
  animationData: assets.love,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const MoviesListData = ({ data, handleModal, state, nextPage, prevPage }) => {
  const dispatch = useDispatch();

  const [stateMovie, setStateMovie] = React.useState({
    isStopped: false,
  });

  const handleNextPage = () => {
    dispatch(nextPage());
    dispatch(setIsAnimate(false));
  };

  const handleAdd = (v, data) => {
    setStateMovie((prev) => ({
      ...prev,
      isStopped: !stateMovie.isStopped,
    }));
    dispatch(handleFavourAction(v));
  };

  return (
    <Wrapper animation={state.isAnimate} color="black">
      {data?.Response === "True" ? (
        <div className="wrapper-list">
          <div className="list">
            {data?.Search?.map((v, i) => (
              <MovieList key={i}>
                <div className="left">
                  <span onClick={() => handleModal(v?.imdbID)}>{v?.Title}</span>
                </div>
                <div className="right">
                  <div onClick={() => handleAdd(v)}>
                    <Lottie
                      options={defaultOptions}
                      height={50}
                      width={50}
                      isPaused={false}
                      isStopped={dispatch(wordingFavour(v, data))}
                    />
                  </div>
                </div>
              </MovieList>
            ))}
          </div>
          <div className="pagination">
            <button
              disabled={state?.page === 1}
              onClick={() => dispatch(prevPage())}
            >
              Prev
            </button>
            <span>{state?.page}</span>
            <button
              disabled={data?.length === 0}
              onClick={() => handleNextPage()}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <>
          <ErrorText>
            For some reason, we couldn't load 😓, try another keyword
          </ErrorText>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .wrapper-list {
    margin-top: 20px;
    width: 100%;
    animation-name: ${(props) => props.animation && `slide-in-right`};
    animation-duration: ${(props) => props.animation && `2s`};

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

    .pagination {
      margin: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;

      span {
        font-size: 18px;
        font-weight: 600;
      }
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

  .left {
    cursor: pointer;
  }

  .right {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`;

const ErrorText = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 20px;
  font-size: 26px;
  font-weight: 700;
  margin-top: 2vh;
  height: 420px;
  align-items: center;
`;

export default MoviesListData;
