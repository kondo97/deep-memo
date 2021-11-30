import prisma from '../../../../lib/prisma'

export async function deleteUser(id: number): Promise<void> {
  await prisma.user.delete({
    where: {
      id: id,
    },
  });
}