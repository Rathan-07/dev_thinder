import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { toast } from "react-toastify";

export const Login = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
  });
  const [serverError, setServerError] = useState(null);
  const [clientError, setClientError] = useState({});
  const [isLoginForm, setIsLoginForm] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = isLoginForm ? `/login` : `/signup`;

const runValidation = () => {
  let error = {};
  if (!isLoginForm && !formData?.firstName) {
    error.firstName = "Firstname is required";
  }
  if (!isLoginForm && !formData?.lastName) {
    error.lastName = "Lastname is required";
  }
  if (!formData?.emailId) {
    error.emailId = "Email is required";
  }
  if (!formData?.password) {
    error.password = "Password is required";
  }
  return error;
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const clientSideError = runValidation();

  if (Object.keys(clientSideError).length === 0) {
    try {
      const res = await axios.post(BASE_URL + auth, formData, {
        withCredentials: true,
      });

      const message = !isLoginForm
        ? "User created successfully"
        : "User logged in successfully";
      const navigateTo = isLoginForm ? "/feed" : "/profile";
      const userData = isLoginForm ? res.data : res?.data?.data;

      toast.success(message, { autoClose: 2000 });
      dispatch(addUser(userData));
      navigate(navigateTo);
    } catch (err) {
      if (err?.response?.data?.error) {
        setServerError(err.response.data.error);
        setClientError({});
      }
    }
  } else {
    setClientError(clientSideError);
  }
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setClientError((prev)=>{
      const updatedErrors = {...prev}
      delete updatedErrors[name]
      return updatedErrors
    })
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? `Login` : `Sign In`}
          </h2>
          {serverError && (
            <p className="text-red-500 text-center mt-2">{serverError}</p>
          )}

          <form onSubmit={handleSubmit}>
            <fieldset className="fieldset">
              {!isLoginForm && (
                <>
                  <legend className="fieldset-legend">First Name:</legend>
                  <input
                    type="text"
                    className="input"
                    placeholder="Enter your firstname"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  <br/>
                  {clientError?.firstName && <p className="text-red-500">{clientError?.firstName}</p>}

                  <legend className="fieldset-legend">Last Name:</legend>
                  <input
                    type="text"
                    className="input"
                    placeholder="Enter your lastname"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                  <br/>
                  {clientError?.lastName && <p className="text-red-500">{clientError?.lastName}</p>}
                </>
              )}

              <legend className="fieldset-legend">Email</legend>
              <input
                type="text"
                className="input"
                placeholder="Enter your email"
                name="emailId"
                value={formData.emailId}
                onChange={handleChange}
              />
              <br/>
              {clientError?.emailId && <p className="text-red-500">{clientError?.emailId}</p>}

              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                className="input"
                placeholder="Enter your password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <br/>
              {clientError?.password && <p className="text-red-500">{clientError?.password}</p>}
            </fieldset>

            <div className="card-actions justify-center mt-4 mb-2">
              <button type="submit" className="btn btn-primary">
                {isLoginForm ? "Login" : "Signup"}
              </button>
            </div>
            <p
              className="flex justify-center my-4 cursor-pointer"
              onClick={() => setIsLoginForm((value) => !value)}
            >
              {isLoginForm
                ? `New user ? Sign up here`
                : `Already user ? Login here`}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
