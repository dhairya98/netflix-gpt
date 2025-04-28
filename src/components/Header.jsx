import { signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
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
    console.log("e", e.target.value);
    dispatch(changeLanguage(e.target.value));
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
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
    <div className="absolute px-8 py-2 bg-gradient-to-b from-black w-full z-10 flex justify-center flex-col md:flex-row md:justify-between">
      <img
        src={LOGO}
        alt="Netflix logo"
        aria-hidden="true"
        className="w-44 mx-auto md:mx-0"
      />
      {user && (
        <div className="flex justify-between items-center p-2">
          {showGptSearch && (
            <select
              className="p-2 bg-gray-900 text-white m-2"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option value={lang.identifier} key={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg cursor-pointer"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "Back to Home" : "GPT Search"}
          </button>
          <img
            src={USER_ICON}
            alt="User Icon"
            aria-hidden="true"
            className="w-12 h-12 p-2 hidden md:block"
          />
          <div className="text-white mr-5">{user.displayName}</div>
          <button
            onClick={handleSignOut}
            className="cursor-pointer font-bold text-white"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
