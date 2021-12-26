import React, { useState } from "react";
import { BigHead } from "@bigheads/core";
import { getRandomOptions } from "../utils/bigheads";

function TestBigHead() {
  const [avatar, setAvatar] = useState({});
  const [genAvatar, setGenAvatar] = useState(false);

  const generateAvatar = function (e) {
    e.preventDefault();

    setGenAvatar(true);

    setAvatar(getRandomOptions());

    // newAvatar = <BigHead {...avatar} />;
  };

  return (
    <div style={{ width: "200px" }}>
      <button onClick={generateAvatar}>Generate</button>
      {/* <BigHead {...getRandomOptions()} /> */}
      {genAvatar && <BigHead />}
    </div>
  );
}

export default TestBigHead;
