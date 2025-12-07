import { z } from "zod";

export const emailSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const otpSchema = z.object({
  email: z.string().email(),
  otp: z.string().min(4, "OTP must be at least 4 digits"),
});

export const registerSchema = z
  .object({
    email: z.string().email(),
    firstName: z.string().min(2, "First name is too short"),
    lastName: z.string().min(2, "Last name is too short"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type EmailInput = z.infer<typeof emailSchema>;
export type OtpInput = z.infer<typeof otpSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
