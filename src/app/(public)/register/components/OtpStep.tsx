import { FieldErrors, UseFormRegister } from "react-hook-form";
import { RegisterFormValues } from "../types";

type Props = {
  register: UseFormRegister<RegisterFormValues>;
  errors: FieldErrors<RegisterFormValues>;
};

export function OtpStep({ register, errors }: Props) {
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
    </div>
  );
}
