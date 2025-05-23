import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { gettag } from "../../api/api";

export default function Tags() {
  const [tags, setTags] = useState([
  { tagname: "java", tagdesc: "A high-level, class-based programming language" },
  { tagname: "javascript", tagdesc: "The language of the web for frontend and backend" },
  { tagname: "python", tagdesc: "A versatile language great for AI and data science" },
  { tagname: "react", tagdesc: "A JavaScript library for building user interfaces" },
  { tagname: "nodejs", tagdesc: "JavaScript runtime for server-side applications" },
  { tagname: "css", tagdesc: "Stylesheet language used for describing the presentation of a document" },
  { tagname: "html", tagdesc: "Standard markup language for creating web pages" },
  { tagname: "sql", tagdesc: "Language for managing and querying relational databases" },
]);


  // const fetchtags = async () => {
  //   const tag = await gettag();
  //   // setTags(tags.data);
  //   console.log("tags", tags);
  // };

  // useEffect(() => {
  //   fetchtags();
  // }, []);

  return (
    <>
      <h1 className=" m-3">Tags</h1>
      <div className="m-3">
        A tag is a keyword or label that categorizes your question with other,
        similar questions. <br></br>Using the right tags makes it easier for
        others to find and answer your question.
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          padding: "10px",
          justifyContent: "space-evenly",
        }}
      >
        {tags.map((tag) => (
          <Card style={{ minWidth: "25%", width:'25%', marginBottom: "10px" }}>
            <Card.Body>
              <Card.Title>{tag.tagname}</Card.Title>
              <Card.Text>{tag.tagdesc}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
}
