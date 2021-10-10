import React, { useState, useContext } from "react";
import { Button, Form } from "semantic-ui-react";

export default function Login(props) {
  const [errors, setErrors] = useState({});

  const onSubmit = () => {};

  return (
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
}
