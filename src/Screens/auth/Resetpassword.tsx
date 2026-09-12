import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FiLock } from "react-icons/fi";
import { useParams } from "react-router-dom";
import axios from "axios";
import apis from "../../config/apis";
import { errortoast, successtoast, warningtoast } from "../../toastify/toastify";
import type { AuthResponse } from "./Signup";

interface ResetPasswordBody {
  password: string;
  confirm_password: string;
}

const ResetPassword = () => {

  const { token } = useParams() as { token: string };
  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(true);
  const [user, setuser] = useState<ResetPasswordBody>({
    password: "",
    confirm_password: ""
  });

  const changehandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setuser({ ...user, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios.put<AuthResponse>(`${apis.auth}/reset-password/${token}`, user);
      const { error, warning, success } = data;
      if (error) errortoast(error);
      if (warning) warningtoast(warning);
      if (success) {
        successtoast(success);
        setTimeout(() => { location.href = "/success"; }, 2000);
      }
    } catch (err: unknown) {
      console.log((err as Error).message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md overflow-hidden border border-sky-100">

        <div className="bg-sky-700 px-10 py-8 text-center">
          <div className="w-14 h-14 bg-white/15 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-white">Reset Password</h2>
          <p className="text-sky-200 text-sm mt-1">Create a new secure password</p>
        </div>

        <div className="px-10 py-8">
          <form onSubmit={handleSubmit}>

            <div className="mb-5">
              <label className="block text-[11px] font-semibold text-slate-400 tracking-widest uppercase mb-1.5">
                New Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-500 text-[15px]" />
                <input
                  type={show1 ? "password" : "text"}
                  name="password"
                  value={user.password}
                  onChange={changehandler}
                  placeholder="Enter New Password"
                  className="w-full pl-9 pr-10 py-3 rounded-md border border-sky-200 bg-sky-50 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent hover:border-sky-400 transition"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sky-500 cursor-pointer text-xl"
                  onClick={() => setShow1(!show1)}>
                  {show1 ? <BsEye /> : <BsEyeSlash />}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-[11px] font-semibold text-slate-400 tracking-widest uppercase mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-500 text-[15px]" />
                <input
                  type={show2 ? "password" : "text"}
                  name="confirm_password"
                  value={user.confirm_password}
                  onChange={changehandler}
                  placeholder="Enter Confirm Password"
                  className="w-full pl-9 pr-10 py-3 rounded-md border border-sky-200 bg-sky-50 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent hover:border-sky-400 transition"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sky-500 cursor-pointer text-xl"
                  onClick={() => setShow2(!show2)}>
                  {show2 ? <BsEye /> : <BsEyeSlash />}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-sky-700 hover:bg-sky-800 text-white py-3 rounded-md font-semibold transition flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Reset Password
            </button>

          </form>

          <div className="mt-4 flex items-center justify-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <a href="/login" className="text-sky-600 text-sm font-semibold hover:text-sky-800 transition">
              Back to Login
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ResetPassword;