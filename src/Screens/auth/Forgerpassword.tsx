import { errortoast, successtoast, warningtoast } from "../../toastify/toastify";
import { Link } from "react-router-dom";
import apis from "../../config/apis";
import { useState } from "react";
import axios from 'axios';
import { FiMail } from "react-icons/fi";
import type { AuthResponse } from "./Signup";

interface ForgetType {
  email: string;
}

const ForgotPassword = () => {

  const [user, setuser] = useState<ForgetType>({
    email: ""
  });

  const changehandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setuser({ ...user, [name]: value });
  };

  const forgethandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const { data } = await axios.post<AuthResponse>(`${apis.auth}/forget-password`, user);
      const { error, warning, success } = data;
      if (error) {
        errortoast(error);
      }
      if (warning) {
        warningtoast(warning);
      }
      if (success) {
        setTimeout(() => {
          location.href = "/otp";
        }, 2000);
        successtoast(success);
      }
    } catch (err: unknown) {
      console.log((err as Error).message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md overflow-hidden">

        <div className="bg-sky-700 px-10 py-8 text-center">
          <h2 className="text-2xl font-semibold text-white">Forgot Password?</h2>
          <p className="text-sky-200 text-sm mt-1">Enter your email to receive OTP</p>
        </div>

        <div className="px-10 py-8">

          <div className="flex items-start gap-3 bg-sky-50 border border-sky-200 rounded-lg px-4 py-3 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-sky-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sky-700 text-sm leading-relaxed">
              Enter the email address linked to your account. We'll send you an OTP to verify your identity.
            </p>
          </div>

          <form onSubmit={forgethandler}>

            <div className="mb-6">
              <label className="block text-[11px] font-semibold text-slate-400 tracking-widest uppercase mb-1.5">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-500 text-[15px]" />
                <input
                  type="text"
                  name="email"
                  value={user.email}
                  onChange={changehandler}
                  placeholder="Enter your email or mobile number"
                  className="w-full pl-9 pr-3 py-3 text-sm rounded-md border border-sky-200 bg-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent hover:border-sky-400 transition"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-sky-700 hover:bg-sky-800 text-white py-3 rounded-md font-semibold transition flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Send OTP
            </button>

          </form>

          <div className="mt-5 flex items-center justify-center gap-1.5">
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

export default ForgotPassword;