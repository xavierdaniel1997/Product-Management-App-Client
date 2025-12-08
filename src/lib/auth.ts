import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions, DefaultSession, User } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    role: string;
    firstName: string;
    lastName: string;
    accessToken: string;
    expiresIn: number;
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      role: string;
      firstName: string;
      lastName: string;
      accessToken: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    firstName: string;
    lastName: string;
    accessToken: string;
    expiresIn: number;
    accessTokenIssuedAt: number;
  }
}

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export const authOptions: NextAuthOptions = {
  providers: [
    // GOOGLE LOGIN
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // CREDENTIALS LOGIN
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password)
          throw new Error("Email and password required");

        const res = await fetch(`${API_URL}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(credentials),
        });

        if (!res.ok) {
          const err = await res.json().catch(() => null);
          throw new Error(err?.message || "Login failed");
        }

        const json = await res.json();
        const data = json.data;

        if (!data?.user || !data?.accessToken)
          throw new Error("Invalid login response");

        return {
          id: data.user._id,
          email: data.user.email,
          role: data.user.role,
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          accessToken: data.accessToken,
          expiresIn: data.expiresIn,
        };
      },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user, account, profile }) {
      /* ---------- GOOGLE LOGIN ---------- */
      if (account?.provider === "google") {
        const email = profile?.email as string;
        const name = profile?.name as string;

        const res = await fetch(`${API_URL}/api/auth/google-login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, name }),
        });

        const json = await res.json();
        const data = json.data;

        token.id = data.user._id;
        token.email = data.user.email;
        token.role = data.user.role;
        token.firstName = data.user.firstName;
        token.lastName = data.user.lastName;
        token.accessToken = data.accessToken;
        token.expiresIn = data.expiresIn;
        token.accessTokenIssuedAt = Date.now();

        return token;
      }

      /* ---------- CREDENTIALS LOGIN ---------- */
      if (user) {
        const userObj = user as User;
        token.id = userObj.id;
        token.email = user.email as string;
        token.role = userObj.role;
        token.firstName = userObj.firstName;
        token.lastName = userObj.lastName;
        token.accessToken = userObj.accessToken;
        token.expiresIn = userObj.expiresIn;
        token.accessTokenIssuedAt = Date.now();
      }

      /* ---------- REFRESH TOKEN ---------- */
      const expiresMs = token.expiresIn * 1000;
      const expired =
        Date.now() - token.accessTokenIssuedAt > expiresMs;

      if (expired) return refreshAccessToken(token);

      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id,
        email: token.email,
        role: token.role,
        firstName: token.firstName,
        lastName: token.lastName,
        accessToken: token.accessToken,
      };

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

// TOKEN REFRESH
async function refreshAccessToken(token: import("next-auth/jwt").JWT) {
  const res = await fetch(`${API_URL}/api/auth/refresh-token`, {
    method: "POST",
    credentials: "include",
  });

  const json = await res.json();
  const data = json.data;

  return {
    ...token,
    accessToken: data.accessToken,
    expiresIn: data.expiresIn ?? token.expiresIn,
    accessTokenIssuedAt: Date.now(),
  };
}
