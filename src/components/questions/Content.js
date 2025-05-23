import React, { useEffect, useState, useRef, useMemo } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import JoditEditor from "jodit-react";
import { useNavigate } from "react-router-dom";
import up from "../../assets/up.svg";
import down from "../../assets/down.svg";
import { useSelector } from "react-redux";
import {
  addAnswer,
  getAnswer,
  getUserVotes,
  questionById,
  queupvote,
  quedownvote,
  ansdownvote,
  ansupvote,
  addcomment,
  getansvotes,
} from "../../api/api";
import toast, { Toaster } from "react-hot-toast";
import Comments from "./Comments";

export default function Content() {

  const navigate = useNavigate();

  const editor = useRef(null);
  const params = useParams();
  const [value, setValue] = useState("");
  const [question, setQuestion] = useState("");
  const [title, setTitle] = useState("");
  const [queid, setqueId] = useState("");
  const [answers, setAnswer] = useState([]);
  const [vote, setVotes] = useState({});
  const [queVote, setQueVote] = useState(0);
  const [comment, setComment] = useState({});

  const name = useSelector((state) => state.auth.user);

  const config = useMemo(
    () => ({
      buttons: [
        "bold",
        "italic",
        "link",
        "unlink",
        "ul",
        "ol",
        "underline",
        "image",
        "font",
        "fontsize",
        "brush",
        "redo",
        "undo",
        "eraser",
        "table",
      ],
    }),
    []
  );

  const fetchQuestion = async (id) => {
    const res = await questionById(id);
    setTitle(res.data.title);
    setQuestion(parse(res.data.question));
    setqueId(res.data._id);
  };

  const fetchAnswers = async (id) => {
    const res = await getAnswer(id);
    setAnswer(res.data);
  };

  const getValue = (newvalue) => {
    setValue(newvalue);
  };

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    const val = value.replace(/<\/?p>/g, "");
    const username = localStorage.getItem("username");
    const res = await addAnswer({ id: id, answer: val, username: username });
    toast.success("Answer added successfully");
    setValue("");
    window.scrollTo(0, 0);
    fetchAnswers(params.type);
  };

  const upvoteQue = async (e, id) => {
    if (localStorage.getItem("username") !== null) {
      e.preventDefault();
      const res = await queupvote(id, name);
      toast.success(res.data.status);
      fetchQueVotes(params.type);
    } else {
      navigate("/login");
    }
  };

  const downvoteQue = async (e, id) => {
    if (localStorage.getItem("username") !== null) {
      e.preventDefault();
      const res = await quedownvote(id, name);
      toast.success(res.data.status);
      fetchQueVotes(params.type);
    } else {
      navigate("/login");
    }
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

  const fetchQueVotes = async (id) => {
    const res = await getUserVotes(id);
    setQueVote(res.data);
  };

  const onChange = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const addComment = async (e, id) => {
    e.preventDefault();
    const username = localStorage.getItem("username");
    const res = await addcomment({
      id: id,
      comment: comment.comment,
      qid: queid,
      username: username,
      name: name,
    });
    toast.success(res.data.message);
    window.scrollTo(0,0);
    fetchQuestion(params.type);
  };


  useEffect(() => {
    fetchQuestion(params.type);
    fetchAnswers(params.type);
    fetchVotes();
    fetchQueVotes(params.type);
  }, []);

  return (
    <div
      style={{
        height: "100%",
        marginTop: "13vh",
        paddingBottom:"13vh",
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
        <div className="d-flex flex-row">
          <div className="d-flex flex-column col-md-0 mt-0 mx-0">
            <img
              id="quv"
              src={up}
              width="20"
              alt="up"
              onClick={(e) => upvoteQue(e, queid)}
            />
            <div className="mx-2">{queVote | 0}</div>
            <img
              id="qdv"
              src={down}
              width="20"
              alt="down"
              onClick={(e) => downvoteQue(e, queid)}
            />
          </div>
          <div className="d-flex flex-column flex-shrink-0 col-md-10 mx-4 my-3">
            <h2>Title : {title}</h2>
            <h4 className="mt-2">Question : {question}</h4>
          </div>
        </div>
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
          <>
            <div className="mt-3">
              {answers.map((ans) => (
                <>
                  <div className="">
                    <div className="d-flex flex-row">
                      <div className="d-flex flex-column col-md-0 mt-0 mx-0">
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
                      <div className="d-flex flex-column flex-shrink-0 col-md-9 mx-4 mt-4">
                        <p>{parse(ans.answer)}</p>
                        <small className="d-flex flex-row-reverse">
                          Posted By : {ans.postedBy}
                        </small>
                        <div
                          className="comments"
                          style={{ display: "relative" }}
                        >
                          <div className="title">
                            <form onSubmit={(e) => addComment(e, ans._id)}>
                              <textarea
                                type="text"
                                placeholder="Add Your comment.."
                                rows={5}
                                cols={100}
                                name="comment"
                                onChange={onChange}
                              ></textarea>
                              <br></br>
                              <button type="submit" className="btn btn-primary">
                                Add comment
                              </button>
                            </form>
                          </div>
                        </div>
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
                  <Comments ansid={ans._id}/>
                </>
              ))}
            </div>
          </>
        )}
        <h4>Your Answer</h4>
        <form onSubmit={(e) => handleSubmit(e, queid)}>
          <JoditEditor
            ref={editor}
            config={config}
            tabIndex={1}
            value={value}
            onChange={(newContent) => getValue(newContent)}
          />
          {localStorage.getItem("username") ? (
            <button type="submit" className="btn btn-primary mt-5 mb-3">
              Post Your Answer
            </button>
          ) : (
            <></>
          )}
        </form>
      </div>
    </div>
  );
}
