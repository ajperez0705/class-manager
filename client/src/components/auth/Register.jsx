import React from "react";
import { Form, Grid, Header, Card } from "semantic-ui-react";
import { BigHead } from "@bigheads/core";
import { motion } from "framer-motion";

function Register({
  onSubmit,
  onChangeHandler,
  setEnteredApp,
  switchMode,
  errors,
  generateAvatar,
  genAvatar,
  formData,
  avatar,
  initialState,
}) {
  return (
    <>
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
    </>
  );
}

export default Register;
