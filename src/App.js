import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./App.css";
import Routes from "./Routes";
import { AppContext } from "./libs/contextLib";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
Amplify.configure(awsconfig);

function App() {
  const history = useHistory();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [families, setFamilies] = useState([]);

  function handleLogout() {
    setIsAuthenticated(false);
    setFirstName("");
    setUsername("");
    setFamilies("");
    history.push("/login");
  }

  return (
    <div className="App container">
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Family Photos</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            {isAuthenticated ? (
              <>
                <NavItem onClick={handleLogout}>Logout</NavItem>
                <LinkContainer to="/view">
                  <NavItem>View</NavItem>
                </LinkContainer>
                <LinkContainer to="/upload">
                  <NavItem>Upload</NavItem>
                </LinkContainer>
              </>
            ) : (
              <>
                <LinkContainer to="/login">
                  <NavItem>Login</NavItem>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <AppContext.Provider
        value={{
          isAuthenticated,
          setIsAuthenticated,
          firstName,
          setFirstName,
          userName,
          setUsername,
          families,
          setFamilies,
        }}
      >
        <Routes />
      </AppContext.Provider>
    </div>
  );
}

export default App;
