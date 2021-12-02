import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { title, content, rating, color } = req.body;
  const userId = Number(req.query?.id)
  if (!userId) return res.status(401).end('Please log in to view');
  const result = await prisma.post.create({
    data: {
      title: title as string,
      content: content as string | null,
      rating: rating as number | null,
      color: color as string | null,
      author: {
        connect: {
          id: userId,
        },
      },
    },
  });
  res.status(200).json(result);
}
