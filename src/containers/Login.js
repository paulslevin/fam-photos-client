import React from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import { useAppContext } from "../libs/contextLib";
import { useFormFields } from "../libs/hooksLib";
import { useHistory } from "react-router-dom";
import { onError } from "../libs/errorLib";
import { Auth } from "aws-amplify";
import { firstNameURL, familesURL } from "../constants/Constants";

export default function Login() {
  const {
    setIsAuthenticated,
    setFirstName,
    setUsername,
    setFamilies,
  } = useAppContext();

  const history = useHistory();
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
  });

  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0;
  }

  async function getFirstName() {
    fetch(new URL(firstNameURL), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(fields.email),
    })
      .then((response) => response.json())
      .then((data) => setFirstName(data));
  }

  async function getFamilies() {
    fetch(new URL(familesURL), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(fields.email),
    })
      .then((response) => response.json())
      .then((data) => setFamilies(data));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await Auth.signIn(fields.email, fields.password);
      setIsAuthenticated(true);
      setUsername(fields.email);
      await getFirstName();
      await getFamilies();
      history.push("/");
    } catch (e) {
      onError(e);
    }
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={fields.password}
            onChange={handleFieldChange}
            type="password"
          />
        </FormGroup>
        <Button block bsSize="large" disabled={!validateForm()} type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}
