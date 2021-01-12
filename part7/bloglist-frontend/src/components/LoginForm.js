import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/userReducer';
import { useField } from '../hooks';
import {
  Button,
  PrimaryTitle,
  Form,
  InputField,
  Input,
  Label,
  Wrapper,
} from '../styled-components';

const LoginForm = () => {
  const username = useField('text', 'username', 'username');
  const password = useField('password', 'password', 'password');

  const dispatch = useDispatch();

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(login({ username: username.value, password: password.value }));
    username.reset();
    password.reset();
  };

  return (
    <Wrapper size="22rem">
      <PrimaryTitle className="txt-center">Login</PrimaryTitle>
      <Form onSubmit={handleLogin}>
        <InputField>
          <Label>Username:</Label>
          <Input {...username.getPureField()} />
        </InputField>
        <InputField>
          <Label>Password:</Label>
          <Input {...password.getPureField()} />
        </InputField>

        <Button id="login-btn" type="submit" primary>
          Login
        </Button>
      </Form>
    </Wrapper>
  );
};

export default LoginForm;
