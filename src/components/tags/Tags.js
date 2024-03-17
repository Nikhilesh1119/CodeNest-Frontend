import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { gettag } from "../../api/api";

export default function Tags() {
  const [tags, setTags] = useState([]);
  const fetchtags = async() => {
    // const tag = await gettag();
    setTags(tags);
  };

  useEffect(() => {
    fetchtags();
  }, []);

  return (
    <>
      <h1 className=" m-3">Tags</h1>
      <div className="m-3">
        A tag is a keyword or label that categorizes your question with other,
        similar questions. <br></br>Using the right tags makes it easier for
        others to find and answer your question.
      </div>
      {tags.length > 0 &&
        tags.map((tag) => (
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>{tag.tagname}</Card.Title>
              <Card.Text>{tag.desc.slice(0,100)}</Card.Text>
            </Card.Body>
          </Card>
        ))}
    </>
  );
}
