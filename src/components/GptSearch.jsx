import React, { useState } from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestion from "./GptMovieSuggestion";
import { BACKGROUND_URL } from "../utils/constants";

const GptSearch = () => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <div className="fixed -z-10">
        <img
          src={BACKGROUND_URL}
          alt="Netflix starter"
          aria-hidden="true"
          className="h-screen w-screen object-cover"
        />
      </div>
      <div className="">
        <GptSearchBar setLoading={setLoading} />
        <GptMovieSuggestion loading={loading} />
      </div>
    </>
  );
};

export default GptSearch;
