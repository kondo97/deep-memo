import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const feed = await prisma.post.findMany({
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  res.status(200).json(feed);
};

export default handle

