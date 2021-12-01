import { Post } from '@prisma/client';
import prisma from '../../../../lib/prisma';

export async function createPost(id: number): Promise<Post> {
  const data = {
    title: 'タイトル',
    content: 'コンテント',
    rating: 1,
    color: 'a',
    author: {
      connect: {
        id: id,
      },
    },
  };
  const post = await prisma.post.create({ data });
  return post
}
