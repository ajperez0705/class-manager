import React from "react";
import { Form, Header } from "semantic-ui-react";
import { motion } from "framer-motion";

function Login({
  onSubmit,
  onChangeHandler,
  errors,
  switchMode,
  setEnteredApp,
}) {
  return (
    <>
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
    </>
  );
}

export default Login;
