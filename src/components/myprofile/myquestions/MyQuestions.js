import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ProfileSidebar from "../profilesidebar/ProfileSideBar";
import ProfileHeader from "../profileheader/ProfileHeader";
import "./myquestions.css";
import Posts from "./Posts";
import { getuserfilteredquestions, getuserquestions } from "../../../api/api";

export default function MyQuestions() {
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    tags: "",
  });

  const [questions, setQuestions] = useState([]);

  const onChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const fetchAllFilteredQuestions = async (e) => {
    e.preventDefault();
    const username = localStorage.getItem("username");
    const res = await getuserfilteredquestions({
      username,
      startDate: filters.startDate,
      endDate: filters.endDate,
    });
    setQuestions(res.data);
  };

  const getUserQuestions = async () => {
    const res = await getuserquestions(localStorage.getItem("username"));
    setQuestions(res.data);
  };

  useEffect(() => {
    getUserQuestions();
  }, []);

  return (
    <div
      className="container"
      style={{
        height: "100vh",
        marginTop: "13vh",
        zIndex: 1,
        backgroundColor: "white",
      }}
    >
      <ProfileSidebar />
      <div className="header_and_content" style={{ width: "100%" }}>
        <ProfileHeader />

        <div className="filters_menu">
          <form onSubmit={(e) => fetchAllFilteredQuestions(e)}>
            <strong Style="display:inline">
              Find your questions between :{" "}
            </strong>
            <input type="date" name="startDate" onChange={onChange} />
            <strong Style="display:inline">To</strong>
            <input type="date" name="endDate" onChange={onChange} />
            <button
              type="submit"
              style={{
                width: "80px",
                borderRadius: "40px",
                marginLeft: "30px",
              }}
            >
              Search
            </button>
          </form>
        </div>
        <div className="questions">
          <div className="question">
            <Posts
              posts={questions}
              key={questions._id}
              fetch={() => getUserQuestions()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
