import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./VerifyEmail.css";

// two to three

const VerifyEmail = () => {
  const [code, setCode] = useState(new Array(5).fill(""));
  const navigate = useNavigate();

  const handleChange = (element, index) => {
    if (element.value.match(/[0-9]/)) {
      const newCode = [...code];
      newCode[index] = element.value;
      setCode(newCode);

      if (element.nextSibling && element.value !== "") {
        element.nextSibling.focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredCode = code.join("");
    console.log("Entered Code:", enteredCode);

    if (enteredCode.length === 5) {
      navigate("/PasswordReset");
    } else {
      alert("Please enter a valid 5-digit code.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h3 className="mb-3">Check your email</h3>
        <p className="text-muted mb-4">
          We sent a reset link to alpha...@gmail.com <br />
          Enter the 5-digit code mentioned in the email
        </p>

        <form onSubmit={handleSubmit}>
          <div className="d-flex justify-content-center mb-3">
            {code.map((value, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                className="form-control mx-1 code-input"
                value={value}
                onChange={(e) => handleChange(e.target, index)}
                onFocus={(e) => e.target.select()}
              />
            ))}
          </div>

          <button type="submit" className="btn btn-block verify-button">
            Verify Code
          </button>
        </form>

        <p className="mt-3">
          Haven't got the email yet?{" "}
          <Link to="/resend" className="text-primary">
            Resend email
          </Link>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
