import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [],
  secret: process.env.NEXTAUTH_SECRET || "local-dev-only-not-for-production-use-32ch",
  pages: {
    signIn: "/account",
  },
};
