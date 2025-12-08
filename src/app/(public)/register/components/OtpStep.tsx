import { FieldErrors, UseFormRegister } from "react-hook-form";
import { useEffect, useState } from "react";
import { RegisterFormValues } from "../types";
import { useVerifyEmail } from "@/hooks/useAuth";

type Props = {
  register: UseFormRegister<RegisterFormValues>;
  errors: FieldErrors<RegisterFormValues>;
  email: string; 
};

export function OtpStep({ register, errors, email }: Props) {
  const [timer, setTimer] = useState<number>(60);
  const verifyEmailMutation = useVerifyEmail();

  // countdown logic
  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = async () => {
    if (!email) return;
    await verifyEmailMutation.mutateAsync(email);
    setTimer(60); 
  };

  return (
    <div className="mb-4">
      <label className="text-sm font-medium text-gray-700">Enter OTP</label>
      <input
        {...register("otp")}
        type="text"
        placeholder="Enter OTP"
        className="mt-1 w-full border rounded-xl px-4 py-3 text-sm focus:outline-none bg-white"
      />
      {errors.otp && (
        <p className="text-xs text-red-500 mt-1">{errors.otp.message}</p>
      )}

      {/* Resend OTP section */}
      <div className="mt-3 text-right">
        {timer > 0 ? (
          <p className="text-gray-500 text-sm">
            Resend OTP in <strong>{timer}s</strong>
          </p>
        ) : (
          <button
            onClick={handleResend}
            type="button"
            className="text-blue-600 text-sm hover:underline"
          >
            Resend OTP
          </button>
        )}
      </div>
    </div>
  );
}
