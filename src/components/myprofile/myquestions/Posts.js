import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import parse from "html-react-parser";
import "../../questions/questions.css";
import "../../header/Header.css";
import { toast, Toaster } from "react-hot-toast";
import { deletequestion, findNumberOfAns, getvotes } from "../../../api/api";

export default function Posts({ posts, fetch }) {
  const [noOfAns, setnoOfAns] = useState({});
  const [vote, setVotes] = useState({});

  const deleteQue = async (id) => {
    const res = await deletequestion(id);
    toast.success(res.data.status);
    window.scrollTo(0, 0);
    fetch();
  };

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
      <Toaster position="top-center" />
      <ul>
        {posts.map((question, i) => (
          <div key={i} className="all-questions">
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
                  to={{ pathname: `/answer/${question._id}` }}
                  className="card-title"
                  style={{ color: "#0074CC" }}
                >
                  <h4>{question.title}</h4>
                </NavLink>
                <div style={{ position: "absolute", right: "7%" }}>
                  <NavLink to={{ pathname: `/updateque/${question._id}` }}>
                    <i
                      style={{ padding: "5px", color: "#0074CC" }}
                      className="fa fa-edit"
                      aria-hidden="true"
                    >
                      update Question
                    </i>
                  </NavLink>
                  <NavLink onClick={() => deleteQue(question._id)}>
                    <i
                      style={{ padding: "25px", color: "#0074CC" }}
                      className="fa fa-trash"
                      aria-hidden="true"
                    >
                      Delete Question
                    </i>
                  </NavLink>
                </div>
                <div style={{ width: "90%" }}>
                  <small style={{ fontSize: "1px" }}>
                    {parse(question.question)[0]}
                  </small>
                </div>
                <div className="mt-3">
                  {question.tags.split(" ").map((tag, i) => (
                    <span
                      key={i}
                      className="question-tags"
                      style={{
                        color: "hsl(205,47%,42%",
                        backgroundColor: "hsl(205,46%,92%",
                        borderRadius: "5px",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="author">
                  <small className="d-flex flex-row-reverse">
                    asked by you at {question.date.slice(0, 10)}
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
