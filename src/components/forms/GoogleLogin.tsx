"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function GoogleLogin() {
  return (
    <button
      type="button"
      onClick={() => signIn("google", { callbackUrl: "/" })}
      className="w-full border py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition text-sm font-medium"
    >
      <FcGoogle className="text-xl" /> Login with Google
    </button>
  );
}
