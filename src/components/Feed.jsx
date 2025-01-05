import React, { useEffect } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../store/feedSlice";
import { BASE_URL } from "../utils/constants";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  console.log("feedstore", feed);

  const handleFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
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

  if (!feed) return;

  if (feed.length <= 0) return <h1>No new users found</h1>;

  return (
    feed && (
      <div className=" flex justify-center my-10">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
