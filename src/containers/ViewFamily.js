import React from "react";
import "./ViewFamily.css";
import { useAppContext } from "../libs/contextLib";
import windowSize from "react-window-size";

function ViewFamily(props) {
  const { families } = useAppContext();
  const path = props.location.pathname.split("/");
  const family = path[path.length - 1];
  const isFamilyValid = families.includes(family);
  const { isAuthenticated } = useAppContext();
  const { imageDataByFamily } = useAppContext();

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
    if (isAuthenticated && family in imageDataByFamily) {
      return imageDataByFamily[family].map((imageData, index) =>
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
