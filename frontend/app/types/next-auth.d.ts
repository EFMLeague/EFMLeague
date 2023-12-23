import NextAuth, { Account, DefaultSession, User } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken?: User.accessToken;
    email?: User.email;
    uid?: User.uid;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: User.accessToken;
    email?: User.email;
    uid?: User.uid;
  }
}
