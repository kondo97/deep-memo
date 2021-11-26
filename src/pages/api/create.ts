import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import prisma from '../../../lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { title, content } = req.body;
  const session = await getSession({ req });
  if (!session) return res.status(401).end('Please log in to view');

  const userId = Number(session.user?.id)
  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      author: {
        connect: {
          id: userId,
        },
      },
    },
  });
  res.status(200).json(result);
}
