"use client"
import { loginSchema } from "@/lib/validations/auth";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { getSession, signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import GoogleLogin from "@/components/forms/GoogleLogin";

type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginPage() {

   const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

   const onSubmit = async (values: LoginFormValues) => {
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    console.log("checking the resposne of the login....", res)
    if (res?.error) {
      toast.error(res.error);
      return;
    }

     toast.success("Login successful!");

    const session = await getSession();

  if (!session?.user) {
    toast.error("Session not available!");
    return;
  }
   
     if (session.user.role === "ADMIN") {
    router.push("/dashboard");
  } else {
    router.push("/");
  }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative p-4">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(229,231,235,0.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(229,231,235,0.3)_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="relative w-full max-w-md p-8 z-10">
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
            <FaLock className="text-blue-600 text-xl" />
          </div>
          <h2 className="text-2xl font-semibold">Welcome Back</h2>
          <p className="text-gray-500 text-sm">Sign in to your account.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <div className="mt-1 flex items-center gap-2 border rounded-xl px-4 py-3 bg-white">
              <FaEnvelope className="text-gray-400" />
              <input
                {...register("email")}
                type="email"
                placeholder="Enter your email"
                className="w-full focus:outline-none text-sm"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-2">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1 flex items-center gap-2 border rounded-xl px-4 py-3 bg-white">
              <FaLock className="text-gray-400" />
              <input
                {...register("password")}
                type="password"
                placeholder="Enter your password"
                className="w-full focus:outline-none text-sm"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 rounded-xl text-sm font-medium hover:bg-blue-700 transition-all mt-4 disabled:opacity-60"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-gray-500 mx-3 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {/* Google Login */}
        {/* <button className="w-full border py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition text-sm font-medium">
          <FcGoogle className="text-xl" /> Login with Google
        </button> */}
        <GoogleLogin/>

        <p className="text-center text-sm text-gray-600 mt-6">
          Dont have an account?
          <Link
            href="/register"
            className="text-blue-600 ml-1 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
