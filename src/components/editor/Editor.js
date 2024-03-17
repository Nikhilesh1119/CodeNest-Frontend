import React, { useRef, useState } from "react";
import { addquestion } from "../../api/api";
import { Toaster, toast } from "react-hot-toast";
import JoditEditor from "jodit-react";
import { useNavigate } from "react-router-dom";

const config = {
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
};

export default function Editor(props) {
  const navigate = useNavigate();
  const editor = useRef(null);
  const [value, setValue] = useState("");
  const [question, setQuestion] = useState({ title: "", tags: "" });

  const getValue = (value) => {
    setValue(value);
  };

  const onChange = (e) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = value.replace(/<\/?p>/g, "");
      const username = localStorage.getItem("username");
      const res = await addquestion({
        title: question.title,
        question: body,
        tags: question.tags,
        username,
      });
      if (res.data.statusCode === 200) {
        toast.success("Question added successfully");
        navigate("/questions");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#f8f9f9",
        height: "100%",
        marginTop: "10vh",
        zIndex: 1,
      }}
    >
      <Toaster position="top-center" />
      <div
        className="container mb-5"
        style={{ width: "70%", display: "block", margin: "auto" }}
      >
        <div className="card mt-5" style={{ backgroundColor: "F0F8FF" }}>
          <div className="card-header">
            <h3>
              <b>Ask a Public Question</b>
            </h3>
          </div>
          <div className="card-body">
            <h5 className="card-title">Writing a Good Question</h5>
            <p className="card-text">
              You’re ready to ask a programming-related question and this form
              will help guide you through the process.
            </p>
            <h5>Steps</h5>
            <ul>
              <li>Summarize your problem in a one-line title.</li>
              <li>Describe your problem in more detail.</li>
              <li>Describe what you tried and what you expected to happen.</li>
              <li>
                Add “tags” which help surface your question to members of the
                community.
              </li>
            </ul>
          </div>
        </div>

        <form onSubmit={handleSubmit} method="post">
          <div className="card mb-3 mt-5">
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  onChange={onChange}
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Title"
                />
                <small id="emailHelp" className="form-text text-muted">
                  Enter Your title in few Words
                </small>
              </div>
            </div>
          </div>

          <JoditEditor
            ref={editor}
            value={props.initialValue}
            config={config}
            tabIndex={1}
            onChange={(newContent) => getValue(newContent)}
          />

          <div className="card mt-3">
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Question Tags</label>
                <input
                  type="text"
                  name="tags"
                  onChange={onChange}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Tags"
                />
                <small id="emailHelp" className="form-text text-muted">
                  Enter Question Tags
                </small>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-5 mb-5">
            Ask Question
          </button>
        </form>
      </div>
    </div>
  );
}
