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
    console.log("Error Message", errorMsg);

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
            console.log("User", user);
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
            console.log("User", user);
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
      <form className="absolute p-12 bg-black/90 sm:w-full md:w-3/12 my-36 mx-auto right-0 left-0 text-white rounded-xl">
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
