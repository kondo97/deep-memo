import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import prisma from '../../../lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const postId = Number(req.query.id);
  // const session = await getSession({ req });
  if (!postId) return res.status(401).end('Please log in to view');
  const result = await prisma.post.delete({
    where: {
      id: postId,
    },
  });
  res.status(200).json(result);
}
