import { api } from "../axios";


export const verifyEmail = async (email: string) => {
  const res = await api.post("/auth/verify-email", { email });
  return res.data;
};

export const verifyOtp = async (email: string, otp: string) => {
  const res = await api.post("/auth/verify-otp", { email, otp });
  return res.data;
};

export const registerUser = async (payload: {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}) => {
  const res = await api.post("/auth/register-user", payload);
  return res.data;
};
