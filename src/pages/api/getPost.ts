import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import prisma from '../../../lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  // const session = await getSession({ req });
  // if (!session) return res.status(401).end('Please log in to view');

  const postId = Number(req.query?.id)

  const post = await prisma.post.findMany({
    where: {
      id: postId,
    },
  });
  res.status(200).json(post);
}
