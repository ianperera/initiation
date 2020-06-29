import React, { useState, useEffect, useContext, memo } from "react";
import { useHistory } from "react-router-dom";
import { Alert, Form, FormGroup, Label, Input, Button } from "reactstrap";
import axios from "axios";
import { AppContext } from "../context";

const AuthPage: React.FC<{}> = memo(() => {
  const { state, dispatch } = useContext(AppContext);
  const history = useHistory();
  const [formState, setFormState] = useState({ username: "", password: "" });
  const [ error, setError ] = useState('')

  useEffect(() => {
    if (state.token) {
      history.push("/dashboard");
    }
    // eslint-disable-next-line
  }, [state.token]);

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newFormState = {
      ...formState,
      [e.currentTarget.name]: e.currentTarget.value,
    };

    setFormState(newFormState);
  };

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!formState.username || !formState.password) {
      setError('Username or Passowrd cannot be empty')
      return
    };

    axios({
      method: "post",
      url: "https://api.intelliscan.io/user/sign-in/",
      data: formState,
    }).then((res) => {
      localStorage.setItem('token', res.data.token)
      dispatch({ type: "SET_TOKEN", payload: res.data.token });
    }).catch(err => {
      setError('Incorrect username and password!')
    });
  };

  return (
    <div className="container h-100 d-flex align-items-center">
      <Form className="w-50 mx-auto p-4 border">
        {error && <Alert color="danger">{error}</Alert>}
        <FormGroup>
          <Label for="username">Username</Label>
          <Input
            id="username"
            name="username"
            value={formState.username}
            onChange={handleInputChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formState.password}
            onChange={handleInputChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Button onClick={handleSubmit}>Submit</Button>
        </FormGroup>
      </Form>
    </div>
  );
});

export default AuthPage;
