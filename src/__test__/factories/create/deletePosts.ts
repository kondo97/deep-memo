import prisma from '../../../../lib/prisma'

export async function deletePost(id: number | null): Promise<void> {
  if(id)
  await prisma.post.delete({ 
    where: {
      id: id,
    },
  });
}