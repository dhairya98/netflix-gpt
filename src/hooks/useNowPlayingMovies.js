import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/movieSlice";
import { apiOptions } from "../utils/apiOptions";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getNowPlayingMovies();
  }, []);
  const getNowPlayingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      apiOptions
    );
    const json = await data.json();
    console.log("JSON DATA", json);
    dispatch(addNowPlayingMovies(json.results));
  };
};

export default useNowPlayingMovies;
