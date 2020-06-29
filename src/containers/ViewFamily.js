import React, { useState, useEffect } from "react";
import "./ViewFamily.css";
import { useAppContext } from "../libs/contextLib";
import windowSize from "react-window-size";

function ViewFamily(props) {
  const { families } = useAppContext();
  const path = props.location.pathname.split("/");
  const family = path[path.length - 1];
  const isFamilyValid = families.includes(family);
  const [imageURLs, setImageURLs] = useState([]);
  const { isAuthenticated } = useAppContext();

  useEffect(() => {
    function getImageURLsByFamily() {
      fetch(
        new URL(
          "http://fam-photos-env.eba-m3urgmky.eu-west-2.elasticbeanstalk.com:80/api/image_urls"
        ),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(family),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setImageURLs(data);
          console.log(data);
        });
    }
    getImageURLsByFamily();
  }, [family]);

  function renderWelcome() {
    if (isFamilyValid === false) {
      return <p>You are not authorized to view this page</p>;
    }
    return <p>View {family} photos below!</p>;
  }

  function renderPics() {
    if (isAuthenticated) {
      return imageURLs.map((imageURL, index) => (
        <div className="pics" key={index}>
          <img src={imageURL} width={props.windowWidth / 2} alt="" />
        </div>
      ));
    }
  }

  return (
    <div className="ViewFamily">
      <div className="lander">
        <h1>Family Photo Viewer</h1>
        {renderWelcome()}
        {renderPics()}
      </div>
    </div>
  );
}

export default windowSize(ViewFamily);
