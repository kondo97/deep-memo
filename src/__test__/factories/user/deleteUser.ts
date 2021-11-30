import prisma from '../../../../lib/prisma'

export async function deleteUser(id: number): Promise<void> {
  console.log(id);
  await prisma.user.delete({
    where: {
      id: id,
    },
  });
}