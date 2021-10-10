import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Home() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  // current Id is used to grab the id of the post you want to edit
  const [currentId, setCurrentId] = useState(null);

  console.log(posts);

  // useEffect(() => {
  // dispatch(getPosts());
  // }, [currentId, dispatch]);

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}

export default Home;
