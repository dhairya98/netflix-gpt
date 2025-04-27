import React from "react";
import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import useMovies from "../hooks/useNowPlayingMovies";

const Browse = () => {
  useMovies()
  return (
    <div>
      <Header />
      <MainContainer />
      <SecondaryContainer />
    </div>
  );
};

export default Browse;
