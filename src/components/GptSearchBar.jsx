import React, { useRef } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import { openai } from "../utils/openai";
import { apiOptions } from "../utils/apiOptions";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const userLanguage = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
      apiOptions
    );
    const json = await data.json();
    return json.results;
  };

  const handleGptSearchClick = async () => {
    const query =
      "Act as a Movie Recommendation system and suggest some movies for the query from TBDB or Netflix: " +
      searchText.current.value +
      "only give me names of 5 movies, comma separated like the example result given ahead. Example - A,B,C,D,E. Also dont put pointers like 1,2,3,4,5, only movie names";
    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: query }],
      model: "gpt-3.5-turbo",
    });
    const gptMovies = gptResults?.choices[0]?.message?.content;
    if (gptMovies) {
      const promiseArray = gptMovies
        .split(",")
        .map((movie) => searchMovieTMDB(movie));
      const tmdbResults = await Promise.all(promiseArray);
      console.log("Results", tmdbResults);
      dispatch(
        addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
      );
    }
  };

  return (
    <div className="pt-[45%] md:pt-[10%] flex justify-center ">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12 rounded-lg"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          placeholder={lang[userLanguage]?.gptSearchPlaceholder}
          className="p-4 m-4 col-span-9 bg-gray-700 text-white"
          ref={searchText}
        />
        <button
          className="py-2 px-4 m-4 bg-red-700 text-white rounded-lg cursor-pointer col-span-3"
          onClick={handleGptSearchClick}
        >
          {lang[userLanguage].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
