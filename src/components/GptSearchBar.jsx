import React, { useRef } from "react";
import lang from "../utils/languageConstants";
import { useSelector } from "react-redux";
import { openai } from "../utils/openai";

const GptSearchBar = () => {
  const userLanguage = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const handleGptSearchClick = async () => {
    const query =
      "Act as a Movie Recommendation system and suggest some movies for the query from TBDB or Netflix: " +
      searchText.current.value +
      "only give me names of 5 movies, comma separated like the example result given ahead. Example - A,B,C,D,E";
    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: query }],
      model: "gpt-3.5-turbo",
    });
    console.log("GPT Results", gptResults.choices);
  };

  return (
    <div className="pt-[10%] flex justify-center">
      <form
        className="w-1/2 bg-black grid grid-cols-12"
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
