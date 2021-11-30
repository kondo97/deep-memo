import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import Adapters from 'next-auth/adapters';
import Providers from 'next-auth/providers';
import prisma from '../../../../lib/prisma';

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options = {
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Providers.Credentials({
      name: 'Credential',
      async authorize() {
        const user = { name: 'ゲストユーザー', email: 'guest@example.com', id: 2 };
        return user;
      },
      credentials: {},
    }),
  ],
  adapter: Adapters.Prisma.Adapter({ prisma }),
  secret: process.env.SECRET,
  callbacks: {
    session: async (session: any, user: any) => {
      return Promise.resolve({
        ...session,
        user: {
          ...session.user,
          id: Number(user.sub),
        },
      });
    },
  },
  session: {
    jwt: true,
  }
};
