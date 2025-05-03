import { signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES, USER_ICON } from "../utils/constants";
import { removeGptResults, toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";
import { removeMoviesandTrailers } from "../utils/movieSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth).then(() => {});
  };

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid, email, displayName }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        dispatch(removeMoviesandTrailers());
        dispatch(removeGptResults());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="absolute px-4 py-3 bg-gradient-to-b from-black w-full z-10">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        {/* Logo */}
        <div className="flex justify-center md:justify-start">
          <img src={LOGO} alt="Netflix logo" className="w-40" />
        </div>

        {user && (
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-end gap-3 w-full md:w-auto">
            {/* Language Selector (only visible when GPT search is on) */}
            {showGptSearch && (
              <select
                className="p-2 bg-gray-900 text-white rounded w-full md:w-auto"
                onChange={handleLanguageChange}
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option value={lang.identifier} key={lang.identifier}>
                    {lang.name}
                  </option>
                ))}
              </select>
            )}

            {/* GPT Toggle */}
            <button
              className="py-2 px-4 bg-purple-800 text-white rounded-lg w-full md:w-auto"
              onClick={handleGptSearchClick}
            >
              {showGptSearch ? "Back to Home" : "GPT Search"}
            </button>

            {/* User Info */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-center md:justify-start">
              <img
                src={USER_ICON}
                alt="User Icon"
                className="w-10 h-10 hidden md:block"
              />
              <div className="text-white font-medium">{user.displayName}</div>
              <button
                onClick={handleSignOut}
                className="font-bold text-white underline hover:no-underline"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
