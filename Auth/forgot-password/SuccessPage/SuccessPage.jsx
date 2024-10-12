import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SuccessPage.css";

const SuccessPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <div className="mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
            alt="success icon"
            style={{ width: "80px" }}
          />
        </div>
        <h4 className="mb-2">Successful</h4>
        <p className="text-muted mb-4">
          Congratulations! Your password has been changed. Click continue to
          login.
        </p>
        <button className="btn btn-block update-button" onClick={handleClick}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
