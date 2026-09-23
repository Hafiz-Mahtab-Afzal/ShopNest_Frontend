import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { FiLock, FiMail, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import apis from '../../config/apis';
import { errortoast, successtoast, warningtoast } from '../../toastify/toastify';

interface UserType {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface AuthResponse {
        error: string;
        warning: string;
        success: string;
}

const SignUp = () => {
  const [show1, sethide1] = useState(true);
  const [show2, sethide2] = useState(true);

  const [user, setuser] = useState<UserType>({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  const Changehandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setuser({ ...user, [name]: value });
  };

  const Signuphandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      
      const { data } = await axios.post<AuthResponse>(`${apis.auth}/pre-signup`, user);
      const { error, warning, success } = data;
      if (error) {
        errortoast(error);
      }
      if (warning) {
        warningtoast(warning);
      }
      if (success) {
        setTimeout(() => {
          location.href = '/checkemail';
        }, 2000);
        successtoast(success);
      }
    } catch (err: unknown) {
      console.log((err as Error).message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-50 px-4 py-8">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md overflow-hidden">
        <div className="bg-sky-700 px-6 sm:px-10 py-6 text-center">
          <h2 className="text-xl font-semibold text-white">Create Account</h2>
          <p className="text-sky-200 text-sm mt-1">Create your account</p>
        </div>

        <div className="px-5 sm:px-8 py-6">
          <form onSubmit={Signuphandler}>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 tracking-widest uppercase mb-1">
                  First Name
                </label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-500 text-[15px]" />
                  <input
                    type="text"
                    name="first_name"
                    value={user.first_name}
                    onChange={Changehandler}
                    placeholder="Ali"
                    className="w-full pl-9 pr-3 py-2.5 text-sm rounded-md border border-sky-200 bg-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent hover:border-sky-400 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 tracking-widest uppercase mb-1">
                  Last Name
                </label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-500 text-[15px]" />
                  <input
                    type="text"
                    name="last_name"
                    value={user.last_name}
                    onChange={Changehandler}
                    placeholder="Khan"
                    className="w-full pl-9 pr-3 py-2.5 text-sm rounded-md border border-sky-200 bg-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent hover:border-sky-400 transition"
                  />
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label className="block text-[11px] font-semibold text-slate-400 tracking-widest uppercase mb-1">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-500 text-[15px]" />
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={Changehandler}
                  placeholder="ali@example.com"
                  className="w-full pl-9 pr-3 py-2.5 text-sm rounded-md border border-sky-200 bg-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent hover:border-sky-400 transition"
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="block text-[11px] font-semibold text-slate-400 tracking-widest uppercase mb-1">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-500 text-[15px]" />
                <input
                  type={show1 ? 'password' : 'text'}
                  name="password"
                  value={user.password}
                  onChange={Changehandler}
                  placeholder="Enter Your Password"
                  className="w-full pl-9 pr-10 py-2.5 text-sm rounded-md border border-sky-200 bg-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent hover:border-sky-400 transition"
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

            <div className="mb-5">
              <label className="block text-[11px] font-semibold text-slate-400 tracking-widest uppercase mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-500 text-[15px]" />
                <input
                  type={show2 ? 'password' : 'text'}
                  name="confirm_password"
                  value={user.confirm_password}
                  onChange={Changehandler}
                  placeholder="Confirm Password"
                  className="w-full pl-9 pr-10 py-2.5 text-sm rounded-md border border-sky-200 bg-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent hover:border-sky-400 transition"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sky-500 cursor-pointer text-lg">
                  {show2 ? (
                    <BsEye onClick={() => sethide2(!show2)} />
                  ) : (
                    <BsEyeSlash onClick={() => sethide2(!show2)} />
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-sky-700 hover:bg-sky-800 text-white py-2.5 rounded-md font-semibold transition text-sm"
            >
              Register
            </button>
          </form>

          <div className="flex items-center gap-3 my-2">
            <div className="flex-1 h-px bg-sky-100"></div>
            <span className="text-xs text-slate-400">or</span>
            <div className="flex-1 h-px bg-sky-100"></div>
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-white border border-sky-200 rounded-md text-slate-700 font-medium text-sm hover:bg-sky-50 hover:border-sky-400 active:scale-[0.98] transition-all"
          >
            <svg width="18" height="18" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.08 17.74 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
              />
              <path
                fill="#FBBC05"
                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-3.58-13.46-8.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              />
            </svg>
            Continue with Google
          </button>

          <p className="mt-4 text-center text-slate-500 text-sm">
            Already have an account?{' '}
            <Link to="/login">
              <span className="text-sky-600 cursor-pointer font-semibold">Login</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
