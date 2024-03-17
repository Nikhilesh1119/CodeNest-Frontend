import { useState, useEffect } from "react";
import { Avatar } from "@mui/material";
import "./ProfileHeader.css";
import { points } from "../../../api/api";

export default function ProfileHeader() {
  const [point, setPoint] = useState(0);

  const Points = async () => {
    const name = localStorage.getItem("username");
    const res = await points(name);
    setPoint(res.data.points);
  };

  useEffect(() => {
    Points();
  }, []);

  return (
    <div className="profile">
      <div className="ProfileAndName">
        <Avatar sx={{ height: "58px", width: "58px" }} />
        <div className="nameAndActive">
          <div className="name">{localStorage.getItem("username")}</div>
          <p>
            User since <strong>{localStorage.getItem("since")}</strong>
          </p>
          <div>Points: {point}</div>
        </div>
      </div>
      <hr style={{ border: "1px solid" }} />
    </div>
  );
}
