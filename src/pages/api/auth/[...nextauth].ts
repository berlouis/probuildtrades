import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        // Fetch user by email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: {
            Builder: true,
            Company: true,
            Trade: true,
          },
        });

        if (!user) {
          return null; // User not found
        }

        // TODO: Validate password (add your hashing check here)
        // Example:
        // const isValid = await verifyPassword(credentials.password, user.password);
        // if (!isValid) return null;

        // Check if any linked entity is suspended
        const suspended =
          (user.Builder?.some(b => b.isSuspended) ?? false) ||
          (user.Company?.some(c => c.isSuspended) ?? false) ||
          (user.Trade?.some(t => t.isSuspended) ?? false);

if (suspended) {
  throw new Error("Access denied: License suspended or expired.");
}

// Return only the flat user properties for NextAuth
return {
  id: String(user.id),       // NextAuth expects string for 'id'
  email: user.email,
  name: user.name,
  role: user.role,
 };

}
    }),
  ],

  callbacks: {
   async session({ session, user }: { session: any; user: any }) {
   session.user = user;
  return session;
},

  },

  pages: {
    error: "/auth/error", // Optional: custom error page on failure
  },
};

export default NextAuth(authOptions);
