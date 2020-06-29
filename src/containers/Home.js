import React from "react";
import "./Home.css";

import { useAppContext } from "../libs/contextLib";

export default function Home() {
  // This context variable is defined in App.js and made available to the child components
  const { isAuthenticated } = useAppContext();
  const { firstName } = useAppContext();

  return (
    <div className="Home">
      <div className="lander">
        <h1>Family Photos</h1>
        <p>A simple app for viewing/uploading family photos</p>
        {isAuthenticated ? <p>Welcome, {firstName}!</p> : <></>}
      </div>
    </div>
  );
}
