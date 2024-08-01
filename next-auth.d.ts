import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: { id?: string | undefined } & DefaultSession["user"];
  }

  interface User {
    id: string;
    email: string;
    username: string;
  }

  interface JWT {
    id: string;
    email: string;
    username: string;
  }
}
