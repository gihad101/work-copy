import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import "./PasswordReset.css";

//three to four 

const PasswordReset = () => {
  const navigate = useNavigate();

  const handleConfirmClick = () => {
    navigate("/ResetPassword");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h3 className="mb-3">Password reset</h3>
        <p className="text-muted mb-4">
          Your password has been successfully reset. <br />
          Click confirm to set a new password.
        </p>

        <button
          className="btn btn-block confirm-button"
          onClick={handleConfirmClick}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default PasswordReset;
