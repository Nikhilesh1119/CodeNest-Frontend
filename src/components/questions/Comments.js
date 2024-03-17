import React, { useEffect, useState } from "react";
import { getcomment } from "../../api/api";
import parse from 'html-react-parser';
export default function Comments(id) {
    const [comment,setComment]=useState({});

  const fetchComments = async () => {
    const res = await getcomment(id.ansid);
    setComment(res.data);
  };

  useEffect(()=>{
    fetchComments();
  },[])

  return (
    <div>
      <h4>{comment.length} Comments</h4>
      {comment.length > 0 && (
        <div className="mt-2">
          {comment.map((cmt) => (
            <div className="">
              <div className="d-flex flex-row">
                <div className="d-flex flex-column flex-shrink-0 col-md-9 mx-4 mt-2">
                  <p>{parse(cmt.comment)}</p>
                  <small className="d-flex flex-row-reverse">
                    Posted By : {cmt.postedBy}
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
  );
}
