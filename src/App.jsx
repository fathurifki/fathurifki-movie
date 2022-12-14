import React, { useState } from "react";
import styled from "styled-components";
import "./App.css";
import ListMoviePage from "./features/ListMovies";
import FavouriteMovies from "./features/FavouriteMovies";
import { useDispatch, useSelector } from "react-redux";
import { allState, setSelectedPage } from "./features/movieSlice";

function App() {
  const dispatch = useDispatch();
  const movie = useSelector(allState);
  const [state, setState] = useState({
    navigationSelected: "list",
  });
  
  React.useEffect(() => {
    dispatch(setSelectedPage(state.navigationSelected));
  }, [state]);

  const DICTIONARY_PAGE = {
    LIST: "list",
    FAVOURITE: "favourite",
  };

  const handleSelectedPage = (val) => {
    setState((prev) => ({
      ...prev,
      navigationSelected: val,
    }));
  };

  return (
    <div className="App">
      <Header>
        <span
          className="navbar-brand mb-0 h1"
          onClick={() => handleSelectedPage(DICTIONARY_PAGE.FAVOURITE)}
        >
          Favourites
        </span>
        <span
          className="navbar-brand mb-0 h1"
          onClick={() => handleSelectedPage(DICTIONARY_PAGE.LIST)}
        >
          Movie List
        </span>
      </Header>
      <div>
        {state.navigationSelected === DICTIONARY_PAGE.LIST ? (
          <ListMoviePage />
        ) : (
          <FavouriteMovies />
        )}
      </div>
    </div>
  );
}

const Header = styled.div`
  display: flex;
  padding: 4px;
  margin-left: 100px;
  margin-right: 100px;
  cursor: pointer;
`;

export default App;
