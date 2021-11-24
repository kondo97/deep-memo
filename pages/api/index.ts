import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  // const sessionInfo = prisma.session.findUnique({
  //   where: {
  //     accessToken: session.accessToken
  //   }
  // })
  // if(!sessionInfo || !sessionInfo.userId) return
  // const user = prisma.user.findUnique(
  //   {
  //     where: {
  //       id: sessionInfo.userId
  //     }
  //   }
  // )
  // if(!user) return
  //  await prisma.post.create({
  //   data: {
  //     title: 'a',
  //     content: 'a',
  //     // author: any,
  //     user: {
  //       connectOrCreate: {
  //         where:  { id: user.id },
  //     }
  //   }
  //  }
  // });
};

export default create