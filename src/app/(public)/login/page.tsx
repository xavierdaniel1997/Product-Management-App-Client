import Link from "next/link";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative p-4">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(229,231,235,0.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(229,231,235,0.3)_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="relative w-full max-w-md  p-8 z-10">
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
            <FaLock className="text-blue-600 text-xl" />
          </div>
          <h2 className="text-2xl font-semibold">Welcome Back</h2>
          <p className="text-gray-500 text-sm">Sign in to your account.</p>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <div className="mt-1 flex items-center gap-2 border rounded-xl px-4 py-3 bg-white">
            <FaEnvelope className="text-gray-400" />
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full focus:outline-none text-sm"
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-2">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <div className="mt-1 flex items-center gap-2 border rounded-xl px-4 py-3 bg-white">
            <FaLock className="text-gray-400" />
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full focus:outline-none text-sm"
            />
          </div>
        </div>

        <div className="flex justify-end mb-4">
          <button className="text-blue-600 text-sm hover:underline">Forgot Password?</button>
        </div>

        {/* Login Button */}
        <button className="w-full bg-blue-600 text-white py-3 rounded-xl text-sm font-medium hover:bg-blue-700 transition-all">
          Login
        </button>

        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-gray-500 mx-3 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Google Login */}
        <button className="w-full border py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition text-sm font-medium">
          <FcGoogle className="text-xl" /> Login with Google
        </button>

        <p className="text-center text-sm text-gray-600 mt-6">
          Dont have an account?
         <Link href="/register" className="text-blue-600 ml-1 hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
