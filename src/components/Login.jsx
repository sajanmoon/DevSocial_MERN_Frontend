import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("sajanmoon52@gmail.com");
  const [password, setPassword] = useState("Moon1@");

  const [error, setError] = useState("");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
      console.log(res.data);
    } catch (error) {
      setError(error?.response?.data || "something went wrong");
      console.error(error);
    }
  };
  return (
    <div className="card bg-base-300 w-96 shadow-xl m-auto">
      <div className="card-body">
        <h2 className="card-title">LOGIN FORM!</h2>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Email</span>
          </div>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Password</span>
          </div>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
        </label>
        <p className=" text-red-500">{error}</p>
        <div className="card-actions justify-center my-4">
          <button className="btn btn-primary" onClick={handleLogin}>
            LOGIN
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
