import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { UserCard } from "./UserCard";
import { Alert } from "./Alert";
import { toast } from "react-toastify";

export const EditProfile = ({user}) => {

  const { firstName, lastName, skills, photoUrl, gender, about ,age} = user;
  const [formData, setFormData] = useState({
    firstName,
    lastName,
    photoUrl,
    skills,
    gender,
    age,
    about,

  });
  const [serverError, setServerError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        BASE_URL + `/profile/edit`,
        formData,
        { withCredentials: true }
      );

      dispatch(addUser(res.data?.data));
      toast.success("Updated successfull",{autoClose:2000})
 
    } catch (err) {
      if (err?.response?.data?.error) {
        setServerError(err.response.data.error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setServerError(null)
  };

  return (
      <div className="flex justify-center my-10">
         <div className="flex justify-center mx-10">
        <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Edit profile</h2>
          {serverError && (
            <p className="text-red-500 text-center mt-2">{serverError}</p>
          )}

          <form onSubmit={handleSubmit}>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">First name:</legend>
              <input
                type="text"
                className="input"
                placeholder="Enter your firstname"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />

              <legend className="fieldset-legend">Last name:</legend>
              <input
                type="text"
                className="input"
                placeholder="Enter your Last name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />

              <legend className="fieldset-legend">Gender:</legend>
              <input
                type="text"
                className="input"
                placeholder="Enter your gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              />

                <legend className="fieldset-legend">Age:</legend>
              <input
                type="text"
                className="input"
                placeholder="Enter your age"
                name="age"
                value={formData.age}
                onChange={handleChange}
              />

               <legend className="fieldset-legend">Photo URL:</legend>
              <input
                type="text"
                className="input"
                // placeholder="Enter your gender"
                name="photoUrl"
                value={formData.photoUrl}
                onChange={handleChange}
              />


              <legend className="fieldset-legend">About:</legend>
              <input
                type="text"
                className="input"
                placeholder="Enter your about"
                name="about"
                value={formData.about}
                onChange={handleChange}
              />

              <legend className="fieldset-legend">Skills:</legend>
              <input
                type="text"
                className="input"
                placeholder="Enter your skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
              />
            </fieldset>

            <div className="card-actions justify-center mt-4">
              <button type="submit" className="btn btn-primary">
                Save profile
              </button>
            </div>
          </form>
        </div>
      </div>
       </div>

<UserCard user={formData} />

      </div>
  );
};
