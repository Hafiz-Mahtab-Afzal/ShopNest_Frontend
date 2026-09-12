import { BsEnvelope, BsCheckCircle, BsExclamationTriangle } from "react-icons/bs";
import { Link } from "react-router-dom";

const CheckEmail = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md overflow-hidden border border-sky-100">

        <div className="bg-sky-700 px-10 py-8 text-center">
          <div className="w-14 h-14 bg-white/15 rounded-full flex items-center justify-center mx-auto mb-3">
            <BsEnvelope className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-2xl font-semibold text-white">Check your email</h2>
          <p className="text-sky-200 text-sm mt-1">We sent a verification link to</p>
          <p className="text-white text-sm font-semibold mt-0.5">user@example.com</p>
        </div>

        <div className="px-10 py-8">

          <div className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 mb-6 space-y-3">
            <div className="flex items-center gap-3">
              <BsCheckCircle className="text-green-500 text-xl flex-shrink-0" />
              <p className="text-slate-700 text-sm">Click on the email link</p>
            </div>
            <div className="flex items-center gap-3">
              <BsCheckCircle className="text-green-500 text-xl flex-shrink-0" />
              <p className="text-slate-700 text-sm">Your account will be activated</p>
            </div>
            <div className="flex items-center gap-3">
              <BsExclamationTriangle className="text-yellow-500 text-xl flex-shrink-0" />
              <p className="text-slate-700 text-sm">Also check your spam folder</p>
            </div>
          </div>

          <p className="text-center text-slate-400 text-sm">
            Wrong email?{" "}
            <Link to="/" className="text-sky-600 font-semibold hover:text-sky-800 transition">
              Go back
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default CheckEmail;
