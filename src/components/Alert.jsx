import React from "react";

export const Alert = ({ message }) => {
  return (

      <div className="alert alert-success">
        <span>{message}</span>
      </div>

  );
};
