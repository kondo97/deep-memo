import type { NextApiRequest, NextApiResponse } from 'next';;
import prisma from '../../../lib/prisma';
import { PostProps } from 'types/PostProps';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const userId = Number(req.query?.id);
  if (!userId) return res.status(401).end('Please log in to view');
  
  let posts

  switch(req.query.order) {
    case '作成日(降順)':
      posts = await prisma.post.findMany({
        skip: Number(req.query.skip),
        take: 8,
        orderBy: {
          createdAt: 'desc' 
        },
        where: {
          author: { id: userId },
        },
      });
      break
    case '作成日(昇順)':
      posts = await prisma.post.findMany({
        skip: Number(req.query.skip),
        take: 8,
        orderBy: {
          createdAt: 'asc'
        },
        where: {
          author: { id: userId },
        },
      });
      break
    case 'スター(高い順)':
      posts = await prisma.post.findMany({
        skip: Number(req.query.skip),
        take: 8,
        orderBy: {
          rating: 'desc'
        },
        where: {
          author: { id: userId },
        },
      });
      break
    case 'スター(低い順)':
      posts = await prisma.post.findMany({
        skip: Number(req.query.skip),
        take: 8,
        orderBy: {
          rating: 'asc'
        },
        where: {
          author: { id: userId },
        },
      });
      break
    case '色別':
      posts = await prisma.post.findMany({
        skip: Number(req.query.skip),
        take: 8,
        orderBy: {
          color: 'asc'
        },
        where: {
          author: { id: userId },
        },
      });
      break
  }

  const count = await prisma.post.count({
    where: {
      author: { id: userId },
    },
  });
  res.status(200).json({ posts, count });
}
