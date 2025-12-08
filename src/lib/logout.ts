import { signOut } from "next-auth/react";

export async function logout() {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    await signOut({ callbackUrl: "/login" });
  } catch (error) {
    console.error("Logout failed:", error);
  }
}
