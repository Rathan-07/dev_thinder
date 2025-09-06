import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

export const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + `/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    } catch (err) {}
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0) return <h1 className="flex justify-center my-10">No Connections Found</h1>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">✨ Connections</h1>

      <div className="grid gap-6">
        {connections.map((connection, idx) => {
          const { firstName, lastName, age, gender, photoUrl, about } = connection;
          return (
            <div
              key={idx}
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
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
