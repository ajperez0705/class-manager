import React, { useState, useContext } from "react";
import { Button, Form } from "semantic-ui-react";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { BigHead } from "@bigheads/core";
import { getRandomOptions } from "../utils/bigheads";

import { signin, signup } from "../actions/auth";
import UserAvatar from "../components/UserAvatar";

const initialState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  bio: "",
  avatar: "",
};

function Auth() {
  const [errors, setErrors] = useState({});
  const [isSignup, setisSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [avatar, setAvatar] = useState({});
  const [genAvatar, setGenAvatar] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const generateAvatar = function (e) {
    e.preventDefault();

    setGenAvatar(true);

    //setAvatar(getRandomOptions());

    let avatarString = JSON.stringify(getRandomOptions());
    setAvatar(JSON.parse(avatarString));
    console.log(avatarString);

    setFormData({ ...formData, avatar: avatarString });
    console.log(formData);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
  };

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const switchMode = () => {
    setisSignup((prevIsSignup) => !prevIsSignup);
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: "AUTH", data: { result, token } });

      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = (error) => {
    console.log(error);
    console.log("Google Sign in was unsuccessful");
  };

  const authForm = isSignup ? (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate>
        <h1>Register</h1>
        <Form.Input
          label="Username"
          placeholder="Username..."
          name="username"
          type="text"
          //   value={values.username}
          //   error={errors.username ? true : false}
          onChange={onChangeHandler}
        />

        <Form.Input
          label="Email"
          placeholder="Email..."
          name="email"
          type="email"
          //   value={values.email}
          //   error={errors.email ? true : false}
          onChange={onChangeHandler}
        />

        <Form.Input
          label="Password"
          placeholder="Password..."
          name="password"
          type="password"
          //   value={values.password}
          //   error={errors.password ? true : false}
          onChange={onChangeHandler}
        />

        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password..."
          name="confirmPassword"
          type="password"
          //   value={values.confirmPassword}
          //   error={errors.confirmPassword ? true : false}
          onChange={onChangeHandler}
        />

        {/* <Form.TextArea
          label="About Me"
          placeholder="Write a little about yourself here"
          name="bio"
          type="text"
          //   value={values.confirmPassword}
          //   error={errors.confirmPassword ? true : false}
          onChange={onChangeHandler}
        /> */}

        <button onClick={generateAvatar}>Generate</button>
        <div style={{ width: "300px" }}>
          {genAvatar && <BigHead {...avatar} />}
        </div>

        <Button type="submit" primary>
          Register
        </Button>
        <GoogleLogin
          clientId="327712308001-bah7566eof34tbrfdlhtm5s6vkpdir12.apps.googleusercontent.com"
          render={(renderProps) => (
            <Button
              primary
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              Google Sign Up
            </Button>
          )}
          onSuccess={googleSuccess}
          onFailure={googleFailure}
          cookiePolicy="single_host_origin"
        />
        <Button type="submit" primary onClick={switchMode}>
          {isSignup
            ? "Already have an account ? Sign in"
            : "Do not have an account? Sign up"}
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  ) : (
    //   if user already has account
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate>
        <h1>Login</h1>
        <Form.Input
          label="Username"
          placeholder="Username..."
          name="username"
          type="text"
          //   value={values.username}
          //   error={errors.username ? true : false}
          onChange={onChangeHandler}
        />

        <Form.Input
          label="Password"
          placeholder="Password..."
          name="password"
          type="password"
          //   value={values.password}
          //   error={errors.password ? true : false}
          onChange={onChangeHandler}
        />

        <Button type="submit" primary>
          Login
        </Button>
        <GoogleLogin
          clientId="327712308001-bah7566eof34tbrfdlhtm5s6vkpdir12.apps.googleusercontent.com"
          render={(renderProps) => (
            <Button
              type="submit"
              primary
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              Google Sign In
            </Button>
          )}
          onSuccess={googleSuccess}
          onFailure={googleFailure}
          cookiePolicy="single_host_origin"
        />
        <Button type="submit" primary onClick={switchMode}>
          {isSignup
            ? "Already have an account ? Sign in"
            : "Do not have an account? Sign up"}
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  return authForm;
}

export default Auth;
