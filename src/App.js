import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./App.css";
import Routes from "./Routes";
import { AppContext } from "./libs/contextLib";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import { useStateWithSessionStorage } from "./libs/hooksLib";
import { imageDataByFamilyURL } from "./constants/Constants";
Amplify.configure(awsconfig);

function App() {
  const history = useHistory();
  const [isAuthenticated, setIsAuthenticated] = useStateWithSessionStorage(
    false,
    "isAuthenticated"
  );
  const [username, setUsername] = useStateWithSessionStorage(false, "username");
  const [firstName, setFirstName] = useStateWithSessionStorage(
    false,
    "firstName"
  );
  const [families, setFamilies] = useStateWithSessionStorage([], "families");
  const [imageDataByFamily, setImageDataByFamily] = useStateWithSessionStorage(
    {},
    "imageDataByFamily"
  );

  function handleLogout() {
    setIsAuthenticated(false);
    setFirstName("");
    setUsername("");
    setFamilies([]);
    setImageDataByFamily({});
    history.push("/login");
  }

  useEffect(() => {
    function getImageDataByFamily() {
      let newData = {};
      families.forEach((family) => {
        fetch(new URL(imageDataByFamilyURL), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(family),
        })
          .then((response) => response.json())
          .then((data) => {
            Object.assign(newData, { [family]: data });
          });
      });
      setImageDataByFamily(newData);
    }
    getImageDataByFamily();
  }, [families, setImageDataByFamily]);

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
          username,
          setUsername,
          families,
          setFamilies,
          imageDataByFamily,
          setImageDataByFamily,
        }}
      >
        <Routes />
      </AppContext.Provider>
    </div>
  );
}

export default App;
