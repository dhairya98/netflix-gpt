import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiOptions } from "../utils/apiOptions";
import { addTrailerVideo } from "../utils/movieSlice";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  useEffect(() => {
    getMovieVideo();
  }, []);
  const getMovieVideo = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      apiOptions
    );
    const json = await data.json();
    const trailer =
      json.results.filter((item) => item.type === "Trailer")[0] ||
      json.results[0];
    dispatch(addTrailerVideo(trailer));
  };
};

export default useMovieTrailer;
