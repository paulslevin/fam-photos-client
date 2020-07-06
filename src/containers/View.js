import React from "react";
import "./View.css";
import { LinkContainer } from "react-router-bootstrap";
import { ListGroupItem } from "react-bootstrap";
import { useAppContext } from "../libs/contextLib";

export default function View() {
  const { families } = useAppContext();

  return (
    <div className="View">
      <div className="lander">
        <h1>Family Photos</h1>
        <p>View photos here</p>
      </div>
      <div className="albums">
        {families.map((family, _) => (
          <LinkContainer key={family} to={`/viewfamily/${family}`}>
            <ListGroupItem>
              <h4>
                <b>{"\u2B95"}</b> {family}
              </h4>
            </ListGroupItem>
          </LinkContainer>
        ))}
      </div>
    </div>
  );
}
