import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import { useNavigate } from "react-router-dom";
import up from "../../../assets/up.svg";
import down from "../../../assets/down.svg";
import {
  ansdownvote,
  ansupvote,
  getAnswer,
  getansvotes,
  questionById,
} from "../../../api/api";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

export default function Content() {
  const navigate = useNavigate();
  const params = useParams();
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [answers, setAnswer] = useState([]);
  const [vote, setVotes] = useState({});

  const name = useSelector((state) => state.auth.user);

  const fetchQuestion = async (id) => {
    const res = await questionById(id);
    setTitle(res.data.title);
    setQuestion(parse(res.data.question));
  };

  const fetchAnswers = async (id) => {
    const res = await getAnswer(id);
    setAnswer(res.data);
  };

  const upvote = async (e, id) => {
    if (localStorage.getItem("username") !== null) {
      e.preventDefault();
      const res = await ansupvote(id, name);
      toast.success(res.data.status);
      fetchVotes();
    } else {
      navigate("/login");
    }
  };

  const downvote = async (e, id) => {
    if (localStorage.getItem("username") !== null) {
      e.preventDefault();
      const res = await ansdownvote(id, name);
      toast.success(res.data.status);
      fetchVotes();
    } else {
      navigate("/login");
    }
  };

  const fetchVotes = async () => {
    const res = await getansvotes();
    setVotes(res.data);
  };

  useEffect(() => {
    fetchQuestion(params.type);
    fetchAnswers(params.type);
    fetchVotes();
    fetchVotes(params.type);
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        marginTop: "13vh",
        zIndex: 1,
        backgroundColor: "white",
      }}
    >
      <Toaster position="top-center" />
      <div
        className="container"
        style={{
          height: "100vh",
          width: "70%",
          display: "block",
          margin: "auto",
        }}
      >
        {/* <div className=" ms-4"> */}
        <h2>Title : {title}</h2>
        <h4 className="mt-3">Question : {question}</h4>
        {/* </div> */}
        <hr
          style={{
            background: "black",
            height: "2px",
            border: "none",
          }}
        />
        <hr />
        <h4>{answers.length} Answers</h4>
        {answers.length > 0 && (
          <div className="mt-3">
            {answers.map((ans) => (
              <div className="">
                <div className="d-flex flex-row">
                  <div class="d-flex flex-column col-md-0 mt-0 mx-0">
                    <img
                      id="auv"
                      src={up}
                      width="20"
                      alt="up"
                      onClick={(e) => upvote(e, ans._id)}
                    />
                    <div className="mx-2">{vote[ans._id] | 0}</div>
                    <img
                      id="adv"
                      src={down}
                      width="20"
                      alt="down"
                      onClick={(e) => downvote(e, ans._id)}
                    />
                  </div>
                  <div class="d-flex flex-column flex-shrink-0 col-md-9 mx-0">
                    <p>{parse(ans.answer)}</p>

                    <small className="d-flex flex-row-reverse">
                      Posted By : {ans.postedBy}
                    </small>
                  </div>
                </div>
                <hr
                  style={{
                    background: "#959595",
                    height: "2px",
                    border: "none",
                  }}
                />
                <hr />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
