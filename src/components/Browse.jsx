import React from "react";
import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import useMovies from "../hooks/useNowPlayingMovies";
import GptSearch from "./GptSearch";
import { useSelector } from "react-redux";
import ShimmerUI from "./ShimmerUI";

const Browse = () => {
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const loading = useMovies();

  return (
    <div>
      <Header />
      {showGptSearch ? (
        <GptSearch />
      ) : loading ? (
        <ShimmerUI />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
    </div>
  );
};

export default Browse;
