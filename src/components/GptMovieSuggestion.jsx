import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import ShimmeringCards from "./ShimmeringCards";

const GptMovieSuggestion = ({ loading }) => {
  const { movieResults, movieNames } = useSelector((store) => store.gpt);

  if (loading) return <ShimmeringCards />;
  if (!movieNames) return null;

  return (
    <div className="p-4 m-4 bg-black text-white opacity-90">
      <div>
        {movieNames?.split(",")?.map((movieName, index) => (
          <MovieList
            key={movieName}
            title={movieName}
            movies={movieResults[index]}
            loading={loading}
          />
        ))}
      </div>
    </div>
  );
};

export default GptMovieSuggestion;
