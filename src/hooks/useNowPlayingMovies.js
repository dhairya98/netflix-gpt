import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNowPlayingMovies,
  addPopularMovies,
  addTopRatedMovies,
  addUpcomingMovies,
} from "../utils/movieSlice";
import { apiOptions } from "../utils/apiOptions";

const useMovies = () => {
  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector(
    (store) => store.movies.nowPlayingMovies
  );
  const [loading, setLoading] = useState(true);

  const fetchAndDispatch = async (url, actionCreator) => {
    const data = await fetch(url, apiOptions);
    const json = await data.json();
    dispatch(actionCreator(json.results));
  };

  useEffect(() => {
    if (!nowPlayingMovies) {
      Promise.all([
        fetchAndDispatch(
          "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
          addNowPlayingMovies
        ),
        fetchAndDispatch(
          "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
          addPopularMovies
        ),
        fetchAndDispatch(
          "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
          addUpcomingMovies
        ),
        fetchAndDispatch(
          "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
          addTopRatedMovies
        ),
      ]).then(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  return loading;
};

export default useMovies;
