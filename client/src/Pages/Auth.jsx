import React, { useState, useContext } from "react";
import { Button, Form } from "semantic-ui-react";
import { GoogleLogin } from "react-google-login";

function Auth() {
  const [errors, setErrors] = useState({});
  const [isSignup, setisSignup] = useState(false);

  const onSubmit = () => {};

  const handleChange = () => {};

  const switchMode = () => {
    setisSignup((prevIsSignup) => !prevIsSignup);
  };

  const googleSuccess = async (res) => {
    console.log(res);
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
          //   onChange={onChange}
        />

        <Form.Input
          label="Email"
          placeholder="Email..."
          name="email"
          type="email"
          //   value={values.email}
          //   error={errors.email ? true : false}
          //   onChange={onChange}
        />

        <Form.Input
          label="Password"
          placeholder="Password..."
          name="password"
          type="password"
          //   value={values.password}
          //   error={errors.password ? true : false}
          //   onChange={onChange}
        />

        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password..."
          name="confirmPassword"
          type="password"
          //   value={values.confirmPassword}
          //   error={errors.confirmPassword ? true : false}
          //   onChange={onChange}
        />
        <Button type="submit" primary>
          Register
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
              Google Sign Up
            </Button>
          )}
          onSuccess={googleSuccess}
          onFailure={googleFailure}
          cookiePolicy="http://localhost:3000/"
        />
        <Button type="submit" primary onClick={switchMode}>
          {isSignup
            ? "Already have an account ? Sign in"
            : "Do not have an account? Sign up"}
        </Button>
      </Form>
      {/* {Object.keys(errors).length > 0 && (
      <div className="ui error message">
        <ul className="list">
          {Object.values(errors).map((value) => (
            <li key={value}>{value}</li>
          ))}
        </ul>
      </div>
    )} */}
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
          //   onChange={onChange}
        />

        <Form.Input
          label="Password"
          placeholder="Password..."
          name="password"
          type="password"
          //   value={values.password}
          //   error={errors.password ? true : false}
          //   onChange={onChange}
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
        />
        <Button type="submit" primary onClick={switchMode}>
          {isSignup
            ? "Already have an account ? Sign in"
            : "Do not have an account? Sign up"}
        </Button>
      </Form>
      {/* {Object.keys(errors).length > 0 && (
      <div className="ui error message">
        <ul className="list">
          {Object.values(errors).map((value) => (
            <li key={value}>{value}</li>
          ))}
        </ul>
      </div>
    )} */}
    </div>
  );

  return authForm;
}

export default Auth;
