import React from "react";
import MovieCard from "./MovieCard";
import ShimmeringCards from "./ShimmeringCards";

const MovieList = ({ title, movies }) => {
  return (
    <div className="px-6 ">
      <h1 className="text-lg md:text-3xl py-2 text-white font-bold">{title}</h1>
      <div className="flex overflow-x-auto">
        <div className="flex">
          {movies?.map((movie) => (
            <MovieCard key={movie?.id} posterPath={movie?.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
