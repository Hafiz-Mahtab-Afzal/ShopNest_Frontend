import { Link } from "react-router-dom";
import { FiCheck, FiLogIn } from "react-icons/fi";

const Success = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md overflow-hidden border border-sky-100">

        <div className="bg-sky-700 px-10 py-8 text-center">
          <div className="w-14 h-14 bg-white/15 rounded-full flex items-center justify-center mx-auto mb-3">
            <FiCheck className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-2xl font-semibold text-white">Password Reset!</h2>
          <p className="text-sky-200 text-sm mt-1">Your account is secured</p>
        </div>

        <div className="px-10 py-8 text-center">
          <h3 className="text-lg font-semibold text-slate-800 mb-2">
            Password Changed Successfully
          </h3>
          <p className="text-slate-500 text-sm mb-8">
            Your password has been successfully reset. You can now login with your new password.
          </p>

          <Link to="/login">
            <button className="w-full bg-sky-700 hover:bg-sky-800 text-white py-3 rounded-md font-semibold transition flex items-center justify-center gap-2">
              <FiLogIn className="w-4 h-4" />
              Go to Login
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Success;