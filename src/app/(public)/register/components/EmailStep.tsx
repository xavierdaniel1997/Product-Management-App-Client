import { FieldErrors, UseFormRegister } from "react-hook-form";
import { RegisterFormValues } from "../types";
import { FaEnvelope } from "react-icons/fa";

type Props = {
  register: UseFormRegister<RegisterFormValues>;
  errors: FieldErrors<RegisterFormValues>;
};

export function EmailStep({ register, errors }: Props) {
  return (
    <div className="mb-4">
      <label className="text-sm font-medium text-gray-700">Email</label>
      <div className="mt-1 flex items-center gap-2 border border-gray-400 rounded-xl px-4 py-3 bg-white">
        <FaEnvelope className="text-gray-400" />
        <input
          {...register("email")}
          type="email"
          placeholder="Enter your email"
          className="w-full focus:outline-none text-sm"
        />
      </div>
      {errors.email && (
        <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
      )}
    </div>
  );
}
