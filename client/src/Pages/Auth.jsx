import React, { useState } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Container,
  Card,
  Image,
  Icon,
} from "semantic-ui-react";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { BigHead } from "@bigheads/core";
import { getRandomOptions } from "../utils/bigheads";
import { motion } from "framer-motion";

import { signin, signup } from "../actions/auth";

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
  const [registerTwo, setRegisterTwo] = useState(false);

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
    <Grid centered stackable>
      <Grid.Row>
        <Grid.Column width={8}>
          <Form
            className="auth_form-register"
            onSubmit={onSubmit}
            inverted
            noValidate
          >
            <Header
              as="h1"
              content="Register"
              inverted
              style={{
                fontSize: "5em",
                fontWeight: "normal",
                marginBottom: 20,
              }}
            />
            <Form.Input
              className="auth-input"
              label="Username"
              placeholder="Berlin"
              name="username"
              type="text"
              // value={formData.username}
              //   error={errors.username ? true : false}
              onChange={onChangeHandler}
            />

            <Form.Input
              className="auth-input"
              label="Email"
              placeholder="berlin@email.com"
              name="email"
              type="email"
              //   value={formData.email}
              //   error={errors.email ? true : false}
              onChange={onChangeHandler}
            />

            <Form.Input
              className="auth-input"
              label="Password"
              placeholder="BellaCiao1"
              name="password"
              type="password"
              //   value={formData.password}
              //   error={errors.password ? true : false}
              onChange={onChangeHandler}
            />

            <Form.Input
              className="auth-input"
              label="Confirm Password"
              placeholder="BellaCiao1"
              name="confirmPassword"
              type="password"
              //   value={formData.confirmPassword}
              //   error={errors.confirmPassword ? true : false}
              onChange={onChangeHandler}
            />

            <Form.TextArea
              className="auth-textarea"
              label="About Me"
              placeholder="Una mañana, me he despertado, O bella adiós, bella adiós, bella adiós, adiós, adiós."
              name="bio"
              type="text"
              //   value={formData.confirmPassword}
              //   error={errors.confirmPassword ? true : false}
              onChange={onChangeHandler}
            />

            <div className="auth-form-btns">
              <motion.button
                className="btn_main"
                onClick={() => setEnteredApp(true)}
                whileHover={{
                  scale: 1.1,
                }}
              >
                Register
              </motion.button>
              <p
                // className="btn_main"
                onClick={switchMode}
                // whileHover={{
                //   scale: 1.1,
                // }}
              >
                Have an account? Login
              </p>
            </div>
            {/* <GoogleLogin
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
                /> */}
          </Form>
          {errors.length > 0 && (
            <div className="ui error message">
              <ul className="list">
                {errors.map((error) => {
                  return <li key={error}>{error}</li>;
                })}
              </ul>
            </div>
          )}
        </Grid.Column>
        <Grid.Column verticalAlign="middle" textAlign="center" width={8}>
          <motion.button
            className="btn_gen-avatar"
            onClick={generateAvatar}
            animate={{
              scale: 1.1,
              transition: {
                duration: 0.4,
                yoyo: Infinity,
              },
            }}
            whileHover={{
              scale: 1.1,
              boxShadow: "0px 0px 19px 5px rgba(255,255,255,0.92)",
            }}
          >
            {genAvatar === false ? "Generate Avatar" : "Regenerate Avatar"}
          </motion.button>
          {
            formData === initialState ? null : (
              <Card className="account-preview" centered>
                <Card.Content>
                  <Card.Header>
                    {genAvatar && <BigHead {...avatar} />}
                  </Card.Header>

                  <div className="account-preview_content">
                    <Card.Description className="account-preview_content-header">
                      {formData.username}
                    </Card.Description>
                    <Card.Meta className="account-preview_content-meta">
                      {formData.email}
                    </Card.Meta>
                    <Card.Description className="account-preview_content-bio">
                      {formData.bio}
                    </Card.Description>
                  </div>
                </Card.Content>
              </Card>
            )
            // <div>{genAvatar && <BigHead {...avatar} />}</div>
          }
        </Grid.Column>
        {/* </div> */}
      </Grid.Row>
    </Grid>
  ) : (
    //   if user already has account
    <div className="form-container">
      <Form
        className="auth_form-login"
        onSubmit={onSubmit}
        size={"large"}
        inverted
        noValidate
      >
        <Header
          as="h1"
          content="Login"
          inverted
          style={{
            fontSize: "5em",
            fontWeight: "normal",
            marginBottom: 20,
          }}
        />
        <Form.Input
          className="auth-input"
          label="Username"
          placeholder="Tokyo"
          name="username"
          type="text"
          // width={16}
          //   value={formData.username}
          //   error={errors.username ? true : false}
          onChange={onChangeHandler}
        />

        <Form.Input
          className="auth-input"
          label="Password"
          placeholder="Oliveria1"
          name="password"
          type="password"
          //   value={formData.password}
          //   error={errors.password ? true : false}
          onChange={onChangeHandler}
        />
        <div className="auth-form-btns">
          <motion.button
            className="btn_main"
            onClick={() => setEnteredApp(true)}
            whileHover={{
              scale: 1.1,
            }}
          >
            Login
          </motion.button>
          <p
            // className="btn_main"
            onClick={switchMode}
            // whileHover={{
            //   scale: 1.1,
            // }}
          >
            Do not have an account? Sign Up.
          </p>
        </div>
        {/* <GoogleLogin
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
          /> */}
      </Form>
      {errors.length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {errors.map((error) => {
              return <li key={error}>{error}</li>;
            })}
          </ul>
        </div>
      )}
    </div>
  );

  return (
    <div className="auth-container">
      {enteredApp === false ? (
        <motion.div
          className="auth-container_enter"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 120 }}
        >
          <Container text textAlign={"center"}>
            <Header
              as="h1"
              content="Welcome To Class Manager"
              inverted
              style={{
                fontSize: "4em",
                fontWeight: "normal",
                marginBottom: 0,
              }}
            />
            <Header
              as="h2"
              content="The ultimate class management tool that keeps students on task and engaged, and teachers free of stress!"
              inverted
              style={{
                fontSize: "1.7em",
                fontWeight: "normal",
                marginTop: "1.5em",
              }}
            />
            <motion.button
              className="btn_enter-app"
              onClick={() => setEnteredApp(true)}
              animate={{
                scale: 1.1,
                transition: {
                  duration: 0.4,
                  yoyo: Infinity,
                },
              }}
              whileHover={{
                scale: 1.1,
                boxShadow: "0px 0px 19px 5px rgba(255,255,255,0.92)",
              }}
            >
              Enter App
            </motion.button>
          </Container>
        </motion.div>
      ) : (
        <div className="auth-container_auth">{authForm}</div>
      )}
    </div>
  );
}

export default Auth;
