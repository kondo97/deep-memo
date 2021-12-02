import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import prisma from '../../../lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const userId = Number(req.query?.id);
  if (!userId) return res.status(401).end('Please log in to view');
  const posts = await prisma.post.findMany({
    skip: Number(req.query.skip),
    take: 2,
    orderBy: [
      {
        createdAt: req.query.orderDate as 'desc' | 'asc' | undefined,
      },
      {
        rating: req.query.orderRating as 'desc' | 'asc' | undefined,
      },
    ],
    where: {
      author: { id: userId },
    },
  });
  const count = await prisma.post.count({
    where: {
      author: { id: userId },
    },
  });
  res.status(200).json({ posts, count });
}
