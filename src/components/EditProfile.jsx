import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { BASE_URL } from "../utils/constants";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [about, setAbout] = useState(user.about || "");
  const [age, setAge] = useState(user.age || "");
  const [error, setError] = useState("");
  const [toast, setToast] = useState(false);
  const dispatch = useDispatch();

  const handleUpdate = async () => {
    try {
      setError("");
      const res = await axios.put(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          about,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } catch (error) {
      setError(error.response.data);
    }
  };
  return (
    <div className=" flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl mx-8 ">
        <div className="card-body">
          <h2 className="card-title">LOGIN FORM!</h2>
          {/* LABEL  */}
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">FirstName</span>
            </div>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
          </label>
          {/* LABEL  */}
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">lastName</span>
            </div>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
          </label>
          {/* LABEL  */}
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">photoUrl</span>
            </div>
            <input
              type="text"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
          </label>
          {/* LABEL  */}
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">about</span>
            </div>
            <input
              type="text"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
          </label>

          {/* LABEL  */}
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Age </span>
            </div>
            <input
              type="text"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
          </label>

          <p className=" text-red-500">{error}</p>
          <div className="card-actions justify-center my-4">
            <button className="btn btn-primary" onClick={handleUpdate}>
              SAVE CHANGES
            </button>
          </div>
        </div>
      </div>
      <UserCard user={{ firstName, lastName, photoUrl, about, age }} />
      {toast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile changes saved sucessfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
