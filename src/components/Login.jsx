import React, { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BACKGROUND_URL } from "../utils/constants";

const Login = () => {
  const [isSignInform, setIsSignInForm] = useState(true);
  //   const [email, setEmail] = useState('')
  //   const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInform);
    setErrorMessage(null);
    email.current.value = null;
    password.current.value = null;
    name.current.value = null;
  };
  const handleButtonClick = (e) => {
    e.preventDefault();
    // Validate the form data
    const errorMsg = isSignInform
      ? checkValidData(email.current.value, password.current.value, false)
      : checkValidData(
          email.current.value,
          password.current.value,
          true,
          name.current.value
        );

    setErrorMessage(errorMsg);
    if (!errorMsg) {
      if (!isSignInform) {
        createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
          .then((userCredential) => {
            const user = userCredential.user;
            updateProfile(user, {
              displayName: name.current.value,
            })
              .then(() => {
                const { uid, email, displayName } = auth.currentUser;
                dispatch(
                  addUser({ uid: uid, email: email, displayName: displayName })
                );
              })
              .catch((err) => {
                console.log("Error Message", err);
                setErrorMessage(err.message);
              });
          })
          .catch((err) => {
            const errCode = err.code;
            setErrorMessage(`${errCode}: ${err.message}`);
          });
      } else {
        signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
          .then((userCredential) => {
            const user = userCredential.user;
          })
          .catch((err) => {
            const errCode = err.code;
            setErrorMessage(`${errCode}: ${err.message}`);
          });
      }
    }
  };
  const actionText = isSignInform
    ? ["Sign In", "New to Netflix? Sign Up Now ?"]
    : ["Sign Up", "Already registered ? Sign In Now"];

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src={BACKGROUND_URL}
          alt="Netflix starter"
          aria-hidden="true"
          className="h-screen w-screen object-cover"
        />
      </div>
      <form className="absolute inset-0 flex items-center justify-center px-4">
        <div className="bg-black bg-opacity-80 p-8 rounded-xl w-full max-w-md text-white space-y-6">
          <h1 className="text-3xl font-bold text-center">{actionText[0]}</h1>

          {!isSignInform && (
            <input
              type="text"
              placeholder="Full Name"
              className="p-3 w-full rounded bg-gray-700 placeholder-gray-300 focus:outline-none"
              ref={name}
            />
          )}

          <input
            type="email"
            placeholder="Email Address"
            className="p-3 w-full rounded bg-gray-700 placeholder-gray-300 focus:outline-none"
            ref={email}
          />

          <input
            type="password"
            placeholder="Password"
            className="p-3 w-full rounded bg-gray-700 placeholder-gray-300 focus:outline-none"
            ref={password}
          />

          {errorMessage && (
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
          )}

          <button
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded font-semibold"
            onClick={handleButtonClick}
          >
            {actionText[0]}
          </button>

          <p
            className="text-sm text-center cursor-pointer hover:underline"
            onClick={toggleSignInForm}
          >
            {isSignInform
              ? "New to Netflix? Sign Up Now"
              : "Already registered? Sign In Now"}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
