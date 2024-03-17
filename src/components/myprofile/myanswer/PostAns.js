import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import "../../header/Header.css";
import { deleteanswer, getvotes } from "../../../api/api";
import { toast, Toaster } from "react-hot-toast";

export default function Posts({ posts }) {
  const [vote, setVotes] = useState({});

  const fetchVotes = async () => {
    const res = await getvotes();
    setVotes(res.data);
  };

  const deleteAns = async (id) => {
    const res = await deleteanswer(id);
    console.log(res);
    toast.success(res.data.status);
    window.scrollTo(0, 0);
    window.location.reload();
  };

  useEffect(() => {
    fetchVotes();
  }, []);

  return (
    <>
      <Toaster position="top-center" />
      <ul>
        {posts.map((answer) => (
          <div style={{ width: "100%" }}>
            <hr />
            <div className="all-questions-container">
              <div className="all-questions-left">
                <div className="all-options">
                  <div className="all-option">
                    <p>{vote[answer._id]}</p>
                    <span>votes</span>
                  </div>
                </div>
              </div>
              <div className="question-answer ">
                <NavLink
                  to={{ pathname: `/question/${answer.questionid}` }}
                  style={{
                    color: "#0074CC",
                    position: "absolute",
                    right: "7%",
                  }}
                >
                  <i className="me-5 ">Go to Question</i>
                </NavLink>
                <div style={{ width: "90%" }}>
                  <p Style="font-size:25px;">{parse(answer.answer)}</p>
                </div>
                <div
                  style={{
                    position: "absolute",
                    right: "7%",
                    marginTop: "35px",
                  }}
                >
                  <NavLink onClick={() => deleteAns(answer._id)}>
                    <i
                      Style="padding:7px; color:#0074CC"
                      className="fa fa-trash"
                      aria-hidden="true"
                    >
                      Delete answer
                    </i>
                  </NavLink>
                </div>
                <div className="author">
                  <div className="author-details mt-3">
                    <p>posted by you at {answer.date.slice(0, 10)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </ul>
    </>
  );
}
