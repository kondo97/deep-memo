import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import prisma from '../../../lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { title, content, rating, color } = req.body;
  const userId = Number(req.query?.id)
  if (!userId) return res.status(401).end('Please log in to view');
  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      rating: rating,
      color: color,
      author: {
        connect: {
          id: userId,
        },
      },
    },
  });
  res.status(200).json(result);
}
