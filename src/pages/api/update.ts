import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { title, content, rating, color } = req.body;
  if(!req.query?.sessionId) return res.status(401).end('Please log in to view');
  const postId = Number(req.query?.postId)
  if(!postId) return res.status(404).end('post not found')

  const result = await prisma.post.update({
    where: {
      id: postId
    },
    data: {
      title: title as string,
      content: content as string | null,
      rating: rating as number | null,
      color: color as string | null
    },
  });
  res.status(200).json(result);
}
