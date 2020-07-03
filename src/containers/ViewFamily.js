import React, { useState, useEffect } from "react";
import "./ViewFamily.css";
import { useAppContext } from "../libs/contextLib";
import windowSize from "react-window-size";
import { imageDataByFamilyURL } from "../constants/Constants";

function ViewFamily(props) {
  const { families } = useAppContext();
  const path = props.location.pathname.split("/");
  const family = path[path.length - 1];
  const isFamilyValid = families.includes(family);
  const [imagesData, setImagesData] = useState([]);
  const { isAuthenticated } = useAppContext();

  useEffect(() => {
    function getImageURLsByFamily() {
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
          setImagesData(data);
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

  function renderImage(imageData, index) {
    return (
      <>
        <div className="pics" key={index}>
          <img src={imageData.url} width={props.windowWidth / 2} alt="" />
          <p className="caption">{imageData.caption}</p>
        </div>
      </>
    );
  }

  function renderPics() {
    if (isAuthenticated) {
      return imagesData.map((imageData, index) =>
        renderImage(imageData, index)
      );
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
