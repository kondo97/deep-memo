import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import prisma from '../../../lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (!session) return res.status(401).end('Please log in to view');

  const userId = Number(session.user?.id);
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    where: {
      author: { id: userId },
    },
  });
  res.status(200).json(posts);
}
