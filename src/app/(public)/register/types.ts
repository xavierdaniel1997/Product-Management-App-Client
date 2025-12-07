export type Step = "EMAIL" | "OTP" | "DETAILS";

export type RegisterFormValues = {
  email: string;
  otp: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
};
