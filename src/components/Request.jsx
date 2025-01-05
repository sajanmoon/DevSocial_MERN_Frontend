import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../store/requestSlice";
import { BASE_URL } from "../utils/constants";

const Request = () => {
  const requests = useSelector((store) => store.request);

  const dispatch = useDispatch();

  const handleReviewRequest = async (status, _id) => {
    try {
      const res = axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });
      console.log("res", res);

      dispatch(addRequest(res?.data?.data));
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    handleRequest();
  }, []);

  if (!requests) return;

  if (requests.length === 0) return <h1>No connection found</h1>;

  return (
    <div className="">
      <h1 className=" text-center my-6">Request</h1>
      {requests.map((request) => {
        const { _id, firstName, lastName, age, gender, photoUrl, about } =
          request.fromUserId;
        return (
          <div
            key={_id}
            className="card card-side bg-base-300 shadow-xl w-2/6 m-auto my-4"
          >
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
              {age && gender && <p>{age + " " + gender}</p>}
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  onClick={() => handleReviewRequest("rejected", request._id)}
                >
                  Reject
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => handleReviewRequest("accepted", request._id)}
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Request;
