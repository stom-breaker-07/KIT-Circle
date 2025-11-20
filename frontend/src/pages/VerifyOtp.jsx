import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VerifyOtp() {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const navigate = useNavigate();
  const correctOtp = "123456"; // demo OTP

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const copy = [...otp];
    copy[index] = value;
    setOtp(copy);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const verify = () => {
    const entered = otp.join("");
    if (entered === correctOtp) {
      navigate("/new-password");
    } else {
      alert("Incorrect OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">

        <h2 className="text-3xl font-bold text-center mb-6">Verify OTP</h2>
        <p className="text-gray-600 text-center mb-6">
          Enter the 6-digit OTP sent to your email
        </p>

        <div className="flex justify-center gap-3 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              className="w-12 h-12 text-xl text-center border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          ))}
        </div>

        <button
          onClick={verify}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold"
        >
          Verify OTP
        </button>

      </div>
    </div>
  );
}
