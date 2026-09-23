import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FiMail, FiLock } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useState } from "react";
import type { AuthResponse } from "./Signup";
import axios from "axios";
import apis from "../../config/apis";
import { errortoast, successtoast, warningtoast } from "../../toastify/toastify";

interface UserType {
  email: string;
  password: string;
}

const Login = () => {
  const [show1, sethide1] = useState(true);

  const [user, setuser] = useState<UserType>({
    email: "",
    password: ""
  });

  const changehandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setuser({ ...user, [name]: value });
  };

  const Loginhandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      // 🟢 FIX: Deployed { withCredentials: true } securely to interchange cookies
      const { data } = await axios.post<AuthResponse>(
        `${apis.auth}/login`, 
        user,
        { withCredentials: true } 
      );

      const { error, warning, success } = data;
      
      if (error) {
        errortoast(error);
      }
      if (warning) {
        warningtoast(warning);
      }
      if (success) {
        // 🟢 FIX: Extracted exact structured data including names directly into token storage
        localStorage.setItem("auth", JSON.stringify(data));
        
        successtoast(success);
        setTimeout(() => {
          location.href = '/';
        }, 2000);
      }
    } catch (err: unknown) {
      console.log((err as Error).message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md overflow-hidden">
        <div className="bg-sky-700 px-6 sm:px-10 py-8 text-center">
          <h2 className="text-2xl font-semibold text-white">Welcome Back</h2>
          <p className="text-sky-200 text-sm mt-1">Login to your account</p>
        </div>

        <div className="px-6 sm:px-10 py-8">
          <form onSubmit={Loginhandler}>
            <div className="mb-4">
              <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-500 text-[15px]" />
                <input
                  type="text"
                  name="email"
                  value={user.email}
                  onChange={changehandler}
                  placeholder="ali@example.com"
                  className="w-full pl-9 pr-3 py-3 text-sm rounded-md border border-sky-200 bg-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent hover:border-sky-400 transition"
                />
              </div>
            </div>

            <div className="mb-2">
              <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-500 text-[15px]" />
                <input
                  type={show1 ? "password" : "text"}
                  name="password"
                  value={user.password}
                  onChange={changehandler}
                  placeholder="Enter Your Password"
                  className="w-full pl-9 pr-10 py-3 text-sm rounded-md border border-sky-200 bg-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent hover:border-sky-400 transition"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sky-500 cursor-pointer text-lg">
                  {show1 ? (
                    <BsEye onClick={() => sethide1(!show1)} />
                  ) : (
                    <BsEyeSlash onClick={() => sethide1(!show1)} />
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <Link to="/signup" className="text-sm font-semibold text-sky-600 hover:text-sky-800 transition">
                Sign Up
              </Link>
              <Link to="/forgetpassword" className="text-sm font-semibold text-sky-600 hover:text-sky-800 transition">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-sky-700 hover:bg-sky-800 text-white py-3 rounded-md font-semibold transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;