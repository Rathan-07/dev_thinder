import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
export const UserCard = ({ user }) => {
  const {_id, firstName, lastName, photoUrl, about, age, gender } = user;
  const dispatch = useDispatch();
  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + `/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {}
  };
  return (
    <div className="card bg-base-200 w-96 shadow-sm">
      <figure className="">
        <img
          className=" h-64 object-cover my-10 "
          src={user?.photoUrl}
          alt="Shoes"
        />
      </figure>
      <div className="card-body my-4">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <span>{age}</span>
        <span>{gender}</span>
        <span>{about}</span>
        <div className="card-actions justify-center my-4">
          <button onClick={() => handleSendRequest("ignored", _id)} className="btn btn-primary">Ignore</button>
          <button onClick={() => handleSendRequest("interested", _id)} className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};
