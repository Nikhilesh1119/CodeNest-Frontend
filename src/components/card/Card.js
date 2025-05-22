import React from "react";
import "./card.css";

export default function Card(props) {
  return (
    <>
      <div
        className="card1"
        style={{
          margin: "10px",
        }}
      >
        <div className="card__copy">
          <h3>{props.title}</h3>
          <p>
            {props.description}
            <br></br>
            <button className="btn btn-primary mb-4" href="/">
              Join
            </button>
          </p>
        </div>
      </div>
    </>
  );
}
