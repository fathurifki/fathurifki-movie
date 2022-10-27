import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import ListMoviePage from "./features/ListMovies";
import FavouriteMovies from "./features/FavouriteMovies";

function App() {
  const [state, setState] = useState({
    navigationSelected: "list",
  });

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
      <div className="header">
        <nav className="navbar navbar-light bg-light">
          <span
            className="navbar-brand mb-0 h1"
            onClick={() => handleSelectedPage(DICTIONARY_PAGE.FAVOURITE)}
          >
            Navbar
          </span>
          <span
            className="navbar-brand mb-0 h1"
            onClick={() => handleSelectedPage(DICTIONARY_PAGE.LIST)}
          >
            Navbar
          </span>
        </nav>
      </div>
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

export default App;
