import React from "react";
import ProfileSidebar from "../profilesidebar/ProfileSideBar.js";
import ProfileHeader from "../profileheader/ProfileHeader.js";
import "./Profile.css";

export default function Profile() {
  return (
    <div>
      <div
        className="container"
        style={{height:"100vh",marginTop:"13vh",zIndex:1,backgroundColor:"white"}}
      >
        <ProfileSidebar />
        <ProfileHeader />
      </div>
    </div>
  );
}
