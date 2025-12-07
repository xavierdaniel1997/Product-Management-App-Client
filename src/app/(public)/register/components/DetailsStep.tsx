import { FieldErrors, UseFormRegister } from "react-hook-form";
import { RegisterFormValues } from "../types";
import { FaLock } from "react-icons/fa";

type Props = {
  register: UseFormRegister<RegisterFormValues>;
  errors: FieldErrors<RegisterFormValues>;
};

export function DetailsStep({ register, errors }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-gray-700">First Name</label>
        <input
          {...register("firstName")}
          type="text"
          placeholder="Enter first name"
          className="mt-1 w-full border rounded-xl px-4 py-3 text-sm focus:outline-none bg-white"
        />
        {errors.firstName && (
          <p className="text-xs text-red-500 mt-1">
            {errors.firstName.message}
          </p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Last Name</label>
        <input
          {...register("lastName")}
          type="text"
          placeholder="Enter last name"
          className="mt-1 w-full border rounded-xl px-4 py-3 text-sm focus:outline-none bg-white"
        />
        {errors.lastName && (
          <p className="text-xs text-red-500 mt-1">
            {errors.lastName.message}
          </p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Password</label>
        <div className="mt-1 flex items-center gap-2 border rounded-xl px-4 py-3 bg-white">
          <FaLock className="text-gray-400" />
          <input
            {...register("password")}
            type="password"
            placeholder="Enter password"
            className="w-full focus:outline-none text-sm"
          />
        </div>
        {errors.password && (
          <p className="text-xs text-red-500 mt-1">
            {errors.password.message}
          </p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <div className="mt-1 flex items-center gap-2 border rounded-xl px-4 py-3 bg-white">
          <FaLock className="text-gray-400" />
          <input
            {...register("confirmPassword")}
            type="password"
            placeholder="Confirm password"
            className="w-full focus:outline-none text-sm"
          />
        </div>
        {errors.confirmPassword && (
          <p className="text-xs text-red-500 mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
    </div>
  );
}
