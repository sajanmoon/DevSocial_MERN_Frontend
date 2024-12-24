import React, { useEffect } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../store/feedSlice";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  console.log("feedstore", feed);

  const handleFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get("http://localhost:3000/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (error) {
      console.error("feed failed");
    }
  };

  useEffect(() => {
    handleFeed();
  }, []);
  console.log("feed", feed);
  console.log("feed[0]", feed[0]);

  return (
    feed && (
      <div className=" flex justify-center my-10">
        <UserCard user={feed} />
      </div>
    )
  );
};

export default Feed;
