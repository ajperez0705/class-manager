import React from "react";
import { BigHead } from "@bigheads/core";

function UserAvatar({ studentAvatar }) {
  return (
    <>
      <div className="user-avatar">
        <BigHead {...JSON.parse(studentAvatar)} />
      </div>
    </>
  );
}

export default UserAvatar;
