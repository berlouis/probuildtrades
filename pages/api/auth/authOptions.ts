import type { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

/**
 * NextAuth configuration
 * Add more providers or callbacks as needed.
 */
export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
};

export default authOptions;
