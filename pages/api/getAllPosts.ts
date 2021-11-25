import { getSession } from "next-auth/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../lib/prisma'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (!session) return res.status(401).end("Please log in to view");

  const userId = session.user?.id;
    const post = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        author: { id: userId },
      },
    });
    res.status(200).json(post);
}
