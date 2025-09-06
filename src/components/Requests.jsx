import axios from "axios";
import { BASE_URL } from "../utils/constants";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const navigate = useNavigate()

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(BASE_URL + `/request/review/${status}/${_id}`,{},{withCredentials:true})
      dispatch(removeRequest(_id))
      toast.success(` You have ${status} the request `,{autoClose:2000})
      // navigate('/connections')

      
    } catch (err) {}
  };
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + `/user/requests/received`, {
        withCredentials: true,
      });
      dispatch(addRequest(res?.data?.data));
    } catch (err) {}
  };
  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;
  if (requests.length === 0) return <h1 className="flex justify-center my-10">No Requests Found</h1>;
  return (
    <div className="max-w-xl   mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">
        ✨Connection request
      </h1>

      <div className="grid gap-6">
        {requests.map((request, idx) => {
          const { _id, firstName, lastName, age, gender, photoUrl, about } =
            request?.fromUserId;
          return (
            <>
              <div
                key={_id}
                className="flex items-center gap-6 bg-base-200 dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow"
              >
                {/* Profile Image */}
                <img
                  alt="profile"
                  className="w-20 h-20 rounded-full object-cover"
                  src={photoUrl}
                />

                {/* Info */}
                <div className="flex flex-col">
                  <h2 className="font-semibold text-xl text-primary">
                    {firstName + " " + lastName}
                  </h2>
                  {age && gender && (
                    <p className="text-gray-500 text-sm">{`${age}, ${gender}`}</p>
                  )}
                  <p className="text-gray-300 mt-1">{about}</p>

                  <div className="flex items-end gap-2 my-2">
                    <button className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                    onClick={()=>reviewRequest("rejected",request._id)}
                    >
                      Reject
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700"
                     onClick={()=>reviewRequest("accepted",request._id)}>
                      Accept
                    </button>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};
