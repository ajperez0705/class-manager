import React from "react";
import { BigHead } from "@bigheads/core";

function UserAvatar({ studentAvatar }) {
  return (
    <>
      <div style={{ width: "300px" }}>
        <BigHead {...JSON.parse(studentAvatar)} />
      </div>
    </>
  );
}

export default UserAvatar;
