import { User } from '@prisma/client';
import prisma from '../../../../lib/prisma'

export async function createUser(): Promise<User> {
  const data = {
    name: 'test',
    emailVerified: null,
    image: null,
  };
  return prisma.user.create({ data });
}
