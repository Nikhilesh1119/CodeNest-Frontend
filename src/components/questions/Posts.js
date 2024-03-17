import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./questions.css";
import "../header/Header.css";
import { findNumberOfAns, getvotes } from "../../api/api";
import parse from "html-react-parser";

export default function Posts({ posts }) {
  const [noOfAns, setnoOfAns] = useState({});
  const [vote, setVotes] = useState({});

  const FindFrequencyOfAns = async () => {
    const res = await findNumberOfAns();
    setnoOfAns(res.data);
  };

  const fetchVotes = async () => {
    const res = await getvotes();
    setVotes(res.data);
  };

  useEffect(() => {
    FindFrequencyOfAns();
    fetchVotes();
  }, []);

  return (
    <>
      <ul>
        {posts.map((question) => (
          <div className="all-questions">
            <div className="all-questions-container">
              <div className="all-questions-left">
                <div className="all-options">
                  <div className="all-option">
                    <p>{vote[question._id]}</p>
                    <span>votes</span>
                  </div>
                  <div className="all-option">
                    {(() => {
                      if (question._id in noOfAns) {
                        return <p>{noOfAns[question._id]}</p>;
                      } else {
                        return <>0</>;
                      }
                    })()}
                    <span>Answers</span>
                  </div>
                </div>
              </div>
              <div className="question-answer">
                <NavLink
                  to={{ pathname: `/question/${question._id}` }}
                  className="card-title"
                  style={{ color: "#0074CC" }}
                >
                  <h4>{question.title}</h4>
                </NavLink>
                <div key={question._id} style={{ width: "90%", fontSize: "1px" }}>
                  {parse(question.question)[0]}
                </div>
                <div className="mt-3">
                  {question.tags.split(" ").map((tag) => (
                    <NavLink
                      to={{ pathname: `/questionOntags/${tag.toLowerCase()}` }}
                      className="question-tags"
                      style={{
                        backgroundColor: "hsl(205,46%,92%)",
                        color: "hsl(205,47%,42%)",
                        borderRadius: "5x",
                      }}
                    >
                      {tag}
                    </NavLink>
                  ))}
                </div>
                <div className="author">
                  <small className="d-flex flex-row-reverse">
                    asked on {question.date.slice(0, 10)}
                    <p style={{ color: "#0074CC" }}>
                      {question.postedBy} &nbsp;
                    </p>
                  </small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </ul>
    </>
  );
}
