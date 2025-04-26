import React, { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";

const Login = () => {
  const [isSignInform, setIsSignInForm] = useState(true);
  //   const [email, setEmail] = useState('')
  //   const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null);
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInform);
  };
  const handleButtonClick = (e) => {
    e.preventDefault();
    // Validate the form data
    const errorMsg = isSignInform
      ? checkValidData(email.current.value, password.current.value, false)
      : checkValidData(email.current.value, password.current.value, true, name.current.value);
    console.log('Error Message', errorMsg);
    
    setErrorMessage(errorMsg);
  };
  const actionText = isSignInform
    ? ["Sign In", "New to Netflix? Sign Up Now ?"]
    : ["Sign Up", "Already registered ? Sign In Now"];

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/9390f6f6-cf80-4bc9-8981-8c2cc8adf98a/web_tall_panel/IN-en-20250421-TRIFECTA-perspective_3c263b0f-a9eb-4dc8-99c0-e81c646bbe38_large.jpg"
          srcset="https://assets.nflxext.com/ffe/siteui/vlv3/9390f6f6-cf80-4bc9-8981-8c2cc8adf98a/web_tall_panel/IN-en-20250421-TRIFECTA-perspective_3c263b0f-a9eb-4dc8-99c0-e81c646bbe38_large.jpg 2000w, https://assets.nflxext.com/ffe/siteui/vlv3/9390f6f6-cf80-4bc9-8981-8c2cc8adf98a/web_tall_panel/IN-en-20250421-TRIFECTA-perspective_3c263b0f-a9eb-4dc8-99c0-e81c646bbe38_medium.jpg 1279w, https://assets.nflxext.com/ffe/siteui/vlv3/9390f6f6-cf80-4bc9-8981-8c2cc8adf98a/web_tall_panel/IN-en-20250421-TRIFECTA-perspective_3c263b0f-a9eb-4dc8-99c0-e81c646bbe38_small.jpg 959w"
          alt="Netflix starter"
          aria-hidden="true"
          class="default-ltr-cache-1e28eon"
        />
      </div>
      <form className="absolute p-12 bg-black/90 w-3/12 my-36 mx-auto right-0 left-0 text-white bg-opacity-50 rounded-xl">
        <h1 className="font-bold text-3xl py-4">{actionText[0]}</h1>
        {!isSignInform && (
          <input
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-700"
            ref={name}
          />
        )}
        <input
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-700"
          ref={email}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700"
          ref={password}
        />
        <p className="text-red-500 text-lg py-2">{errorMessage}</p>
        <button
          className="p-4 my-6 bg-red-700 w-full rounded-lg cursor-pointer"
          onClick={handleButtonClick}
        >
          {actionText[0]}
        </button>
        <p
          className="text-sm py-4 cursor-pointer hover:text-shadow-gray-100"
          onClick={toggleSignInForm}
        >
          {actionText[1]}
        </p>
      </form>
    </div>
  );
};

export default Login;
