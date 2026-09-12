import { errortoast, successtoast, warningtoast } from '../../toastify/toastify';
import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import apis from '../../config/apis';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FiMail } from 'react-icons/fi';

interface otptype {
  otp: string;
}

interface otpResponse {
  error: string;
  warning: string;
  success: {
    message: string;
    token: string;
  };
}

const OTP = () => {

  const [user, setuser] = useState<otptype>({
    otp: ""
  });

  const Changehandler = (otp: string) => {
    setuser({ otp });
  };

  const otphandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await axios.post<otpResponse>(`${apis.auth}/otp`, user);
    const { error, warning, success } = data;
    if (error) {
      errortoast(error);
    }
    if (warning) {
      warningtoast(warning);
    }
    if (success) {
      setTimeout(() => {
        location.href = `/resetpassword/${success.token}`;
      }, 2000);
      successtoast(success.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md overflow-hidden">

        <div className="bg-sky-700 px-10 py-8 text-center">
          <div className="w-14 h-14 bg-white/15 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-white">Verify Your Email</h2>
          <p className="text-sky-200 text-sm mt-1">Enter the OTP sent to your email</p>
        </div>

        <div className="px-10 py-8">

          <div className="flex items-center gap-3 bg-sky-50 border border-sky-200 rounded-lg px-4 py-3 mb-6">
            <FiMail className="text-sky-600 text-[18px] flex-shrink-0" />
            <p className="text-sky-700 text-sm">OTP sent to your registered email address</p>
          </div>

          <form onSubmit={otphandler}>

            <label className="block text-[11px] font-semibold text-slate-400 tracking-widest uppercase mb-4 text-center">
              Enter 5-Digit OTP
            </label>

            <div className="flex justify-center mb-6">
              <OtpInput
                value={user.otp}
                onChange={Changehandler}
                numInputs={5}
                renderSeparator={<span className="w-2"></span>}
                renderInput={(props) => <input {...props} />}
                inputStyle={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "8px",
                  border: "1px solid #bae6fd",
                  fontSize: "20px",
                  fontWeight: "700",
                  color: "#0369a1",
                  background: "#f0f9ff",
                  outline: "none",
                  textAlign: "center",
                }}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-sky-700 hover:bg-sky-800 text-white py-3 rounded-md font-semibold transition flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Verify OTP
            </button>

          </form>

          <p className="mt-4 text-center text-slate-500 text-sm">
            Didn't receive OTP?{' '}
            <span className="text-sky-600 font-semibold cursor-pointer hover:text-sky-800 transition">
              Resend OTP
            </span>
          </p>

          <div className="mt-4 flex items-center justify-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <Link to="/login" className="text-sky-600 text-sm font-semibold hover:text-sky-800 transition">
              Back to Login
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OTP;