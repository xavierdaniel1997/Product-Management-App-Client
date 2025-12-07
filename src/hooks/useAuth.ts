import { registerUser, verifyEmail, verifyOtp } from "@/lib/api/auth";
import { handleApiError } from "@/lib/utils/handleApiError";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useVerifyEmail = () =>
  useMutation({
    mutationFn: (email: string) => verifyEmail(email),
    onSuccess: (response) => {
      toast.success(response.message);
    },
    onError: (error) => {
      handleApiError(error);
    },
  });

export const useVerifyOtp = () =>
  useMutation({
    mutationFn: (payload: { email: string; otp: string }) =>
      verifyOtp(payload.email, payload.otp),
  });

export const useRegister = () =>
  useMutation({
    mutationFn: (payload: {
      email: string;
      firstName: string;
      lastName: string;
      password: string;
      confirmPassword: string;
    }) => registerUser(payload),
  });
