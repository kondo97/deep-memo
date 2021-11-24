import { NextApiHandler } from "next";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";
import prisma from "../../../lib/prisma";

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options = {
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  adapter: Adapters.Prisma.Adapter({ prisma }),
  secret: process.env.SECRET,
  // callbacks: {
  //   async jwt(token, user, account, profile, isNewUser) {           //👈ポイント②
  //     if (account?.accessToken) {
  //       token.accessToken = account.accessToken;
  //     }
  //     return token;
  //   },
  //   async session(session, token) {                                 //👈ポイント③
  //     session.accessToken = token.accessToken;
  //     return session;
  //   },
  // },
};
