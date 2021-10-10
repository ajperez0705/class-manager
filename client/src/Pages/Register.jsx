import React, { useState, useContext } from "react";
import { Button, Form } from "semantic-ui-react";

export default function Register(props) {
  const [errors, setErrors] = useState({});

  const onSubmit = () => {};

  return (
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
