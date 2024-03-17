import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ProfileSidebar from "../profilesidebar/ProfileSideBar";
import ProfileHeader from "../profileheader/ProfileHeader";
import PostsAns from "./PostAns";
import { getuseranswer, getuserfilteredanswer } from "../../../api/api";

export default function Profile() {
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
  });

  const onChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const [answers, setAnswers] = useState([]);

  const fetchAllFilteredAnswers = async (e) => {
    e.preventDefault();
    const username = localStorage.getItem("username");
    const res = await getuserfilteredanswer({
      username,
      startDate: filters.startDate,
      endDate: filters.endDate,
    });
    console.log(res);
    setAnswers(res.data);
  };

  const fetchUserAnswer = async () => {
    const name = localStorage.getItem("username");
    const res = await getuseranswer(name);
    setAnswers(res.data);
  };
  useEffect(() => {
    fetchUserAnswer();
  }, []);

  return (
    <div
      className="container"
      Style="height:100vh;margin-top:13vh; z-index:1; background-color:white"
    >
      <ProfileSidebar />
      <div style={{ display: "block", width: "100%" }}>
        <ProfileHeader />
        <div className="filters_menu">
          <form onSubmit={(e) => fetchAllFilteredAnswers(e)}>
            <strong Style="display:inline">Find your answers between : </strong>
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
            <PostsAns posts={answers} key={answers._id} />
          </div>
        </div>
      </div>
    </div>
  );
}
