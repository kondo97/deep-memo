import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import prisma from '../../../lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  // console.log({req});

  // console.log(req.query.id)
  
  // const session = await getSession({ req });
  // console.log({session});
  
  // if (!session) return res.status(401).end('Please log in to view');

  // const userId = Number(session.user?.id);

  const userId = Number(req.query?.id)
  
  if (!userId) return res.status(401).end('Please log in to view');

  
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
