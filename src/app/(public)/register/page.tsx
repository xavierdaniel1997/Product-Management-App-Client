"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FaUser } from "react-icons/fa";

import { emailSchema, otpSchema, registerSchema } from "@/lib/validations/auth";
import { useRegister, useVerifyEmail, useVerifyOtp } from "@/hooks/useAuth";

import { EmailStep } from "./components/EmailStep";
import { OtpStep } from "./components/OtpStep";
import { DetailsStep } from "./components/DetailsStep";
import type { RegisterFormValues, Step } from "./types";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

export default function RegisterPage() {
  const [step, setStep] = useState<Step>("EMAIL");
  const router = useRouter();

  const verifyEmailMutation = useVerifyEmail();
  const verifyOtpMutation = useVerifyOtp();
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    watch,
  } = useForm<RegisterFormValues>({
    mode: "onSubmit",
    defaultValues: {
      email: "",
      otp: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      if (step === "EMAIL") {
        const parsed = emailSchema.parse({ email: values.email });
        await verifyEmailMutation.mutateAsync(parsed.email);
        setStep("OTP");
        return;
      }

      if (step === "OTP") {
        const parsed = otpSchema.parse({
          email: values.email,
          otp: values.otp,
        });
        await verifyOtpMutation.mutateAsync(parsed);
        setStep("DETAILS");
        return;
      }

      if (step === "DETAILS") {
        const parsed = registerSchema.parse({
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          password: values.password,
          confirmPassword: values.confirmPassword,
        });

        await registerMutation.mutateAsync({
          email: parsed.email,
          firstName: parsed.firstName,
          lastName: parsed.lastName,
          password: parsed.password,
          confirmPassword: parsed.confirmPassword,
        });

        // Auto-login after registration
        const loginResult = await signIn("credentials", {
          email: parsed.email,
          password: parsed.password,
          redirect: false,
        });

        if (loginResult?.error) {
          console.error("Auto-login failed:", loginResult.error);
          return;
        }

        // Redirect to home or dashboard
        toast.success("Register successfully!");
        router.push("/");

        return;
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        err.issues.forEach((issue) => {
          const field = issue.path[0];
          if (typeof field === "string") {
            setError(field as keyof RegisterFormValues, {
              type: "validation",
              message: issue.message,
            });
          }
        });
        return;
      }

      console.error("Registration flow error:", err);
      // toast.error(...) if you want
    }
  };

  const buttonLabel =
    step === "EMAIL" ? "Continue" : step === "OTP" ? "Verify OTP" : "Register";

  const isLoading =
    isSubmitting ||
    verifyEmailMutation.isPending ||
    verifyOtpMutation.isPending ||
    registerMutation.isPending;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative p-4">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(229,231,235,0.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(229,231,235,0.3)_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="relative w-full max-w-md p-8 z-10">
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
            <FaUser className="text-blue-600 text-xl" />
          </div>
          <h2 className="text-2xl font-semibold">Create Account</h2>
          <p className="text-gray-500 text-sm text-center">
            {step === "EMAIL" && "Enter your email to get started."}
            {step === "OTP" && "Enter the OTP sent to your email."}
            {step === "DETAILS" && "Fill in your details to finish signup."}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {step === "EMAIL" && (
            <EmailStep register={register} errors={errors} />
          )}
          {step === "OTP" && <OtpStep register={register} errors={errors} email={watch("email")}/>}
          {step === "DETAILS" && (
            <DetailsStep register={register} errors={errors} />
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl text-sm font-medium hover:bg-blue-700 transition-all mt-4 disabled:opacity-60"
          >
            {buttonLabel}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?
          <Link href="/login" className="text-blue-600 ml-1 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
