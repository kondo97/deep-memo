import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import prisma from '../../../lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { title, content } = req.body;
  if(!req.query?.sessionId) return res.status(401).end('Please log in to view');
  const postId = Number(req.query?.postId)
  if(!postId) return res.status(404).end('post not found')

  const result = await prisma.post.update({
    where: {
      id: postId
    },
    data: {
      title: title,
      content: content,
    },
  });
  res.status(200).json(result);
}
