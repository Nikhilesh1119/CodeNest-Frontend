import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./questions.css";
import "../header/Header.css";
import Posts from "./Posts";
import {
  getAllQuestions,
  questionByHighVotes,
} from "../../api/api";

export default function Questions() {
  const [questions, setQuestions] = useState([]);

  // fetch all the questions
  const fetchAllQuestions =async () => {
    const res = await getAllQuestions();
    setQuestions(res.data);
  };

  // Function to sort questions by higher votes question displays first
  const sortByVotes = async () => {
    const res = await questionByHighVotes();
    setQuestions(res.data);
  };

  useEffect(() => {
    fetchAllQuestions();
  }, []);
  
  return (
    <>
      <div
        style={{
          height: "100%",
          marginTop: "13vh",
          zIndex: 1,
          backgroundColor: "white",
        }}
      >
        <div>
          <div className="stack-index">
            <div className="stack-index-content">
              <div className="main">
                <div className="main-container">
                  <div className="main-top">
                    <h2>All Questions</h2>
                    <NavLink to="/editor">
                      <button>Ask Question</button>
                    </NavLink>
                  </div>
                  <div className="main-desc">
                    <p>{questions.length} Questions</p>
                    <div className="main-filter">
                      <div className="main-tabs">
                        <div className="main-tab">
                          <NavLink onClick={sortByVotes}>Votes</NavLink>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="questions">
                    <div className="question">
                      <Posts posts={questions} key={questions._id}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
