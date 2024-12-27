import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../store/connectionSlice";

const Connection = () => {
  const connections = useSelector((store) => store.connection);
  console.log("connectiondata", connections);

  const dispatch = useDispatch();
  const handleConnection = async () => {
    try {
      const res = await axios.get("http://localhost:3000/user/connection", {
        withCredentials: true,
      });
      dispatch(addConnection(res.data.data));
    } catch (error) {
      console.error("connection fetching failed");
    }
  };

  useEffect(() => {
    handleConnection();
  }, []);

  if (!connections) return;

  if (connections.length === 0) return <h1>No connection found</h1>;

  return (
    <div className="">
      <h1 className=" text-center my-6">CONNECTIONS</h1>
      {connections.map((connection) => {
        const { firstName, lastName, age, gender, photoUrl, about } =
          connection;
        return (
          <div className="card card-side bg-base-300 shadow-xl w-2/6 m-auto my-4">
            <figure>
              {photoUrl && (
                <img
                  className=" w-24 h-24 rounded-full"
                  src={photoUrl}
                  alt="Movie"
                />
              )}
            </figure>
            <div className="card-body">
              <h2 className="card-title">{firstName + " " + lastName}!</h2>
              <p>{about}</p>
              {age && <p>{age}</p>}
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Watch</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connection;
