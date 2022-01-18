import React, { useState } from "react";
import { Form, Grid, Header, Container, Card } from "semantic-ui-react";
// import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { BigHead } from "@bigheads/core";
import { getRandomOptions } from "../utils/bigheads";
import { motion } from "framer-motion";

import { signin, signup } from "../actions/auth";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import Opening from "../components/auth/Opening";

const initialState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  bio: "",
  avatar: "",
};

function Auth() {
  const [errors, setErrors] = useState([]);
  const [isSignup, setisSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [avatar, setAvatar] = useState({});
  const [genAvatar, setGenAvatar] = useState(false);
  const [enteredApp, setEnteredApp] = useState(false);
  // Handles when to see the second part of registration
  // const [registerTwo, setRegisterTwo] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const generateAvatar = function (e) {
    e.preventDefault();

    setGenAvatar(true);

    let avatarString = JSON.stringify(getRandomOptions());
    setAvatar(JSON.parse(avatarString));

    setFormData({ ...formData, avatar: avatarString });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(formData, setErrors, history));
    } else {
      dispatch(signin(formData, setErrors, history));
    }
  };

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  const switchMode = () => {
    setFormData(initialState);
    setErrors([]);
    setisSignup((prevIsSignup) => !prevIsSignup);
  };

  // const googleSuccess = async (res) => {
  //   const result = res?.profileObj;
  //   const token = res?.tokenId;

  //   try {
  //     dispatch({ type: "AUTH", data: { result, token } });

  //     history.push("/");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const googleFailure = (error) => {
  //   console.log(error);
  //   console.log("Google Sign in was unsuccessful");
  // };

  const authForm = isSignup ? (
    <Register
      onSubmit={onSubmit}
      onChangeHandler={onChangeHandler}
      setEnteredApp={setEnteredApp}
      switchMode={switchMode}
      errors={errors}
      generateAvatar={generateAvatar}
      genAvatar={genAvatar}
      formData={formData}
      avatar={avatar}
      initialState={initialState}
    />
  ) : (
    //   if user already has account
    <Login
      onSubmit={onSubmit}
      onChangeHandler={onChangeHandler}
      errors={errors}
      switchMode={switchMode}
      setEnteredApp={setEnteredApp}
    />
  );

  return (
    <div className="auth-container">
      {enteredApp === false ? (
        <Opening setEnteredApp={setEnteredApp} />
      ) : (
        <div className="auth-container_auth">{authForm}</div>
      )}
    </div>
  );
}

export default Auth;
