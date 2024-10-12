import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ForgotPassword.css";

//first to two

const ForgotPassword = () => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate('/VerifyEmail');  
  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h3 className="mb-3">Forgot password</h3>
        <p className="text-muted mb-4">
          Please enter your email to reset the password
        </p>

        <form>
          <div className="mb-3">
            <input
              type="email"
              className="form-control email-input"
              placeholder="Enter your email"
            />
          </div>
          <button
            type="button"
            className="btn btn-block reset-button"
            onClick={handleClick}
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
