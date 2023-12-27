import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "@/db";

export const { handlers: {GET, POST}, auth, signOut, signIn } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    // Usually not needed, here we are fixing a bug in nextauth
    async session({ session, user}: any) {
      if(session && user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
});