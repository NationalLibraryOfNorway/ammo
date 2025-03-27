'use server';

import {getUserToken} from '@/utils/cookieUtils';
import prisma from '@/lib/prisma';
import {ItemLock, Prisma} from '@prisma/client';
import BatchPayload = Prisma.BatchPayload;

export async function getAllLocks(): Promise<ItemLock[]> {
  return prisma.itemLock.findMany();
}

export async function getLock(id: string): Promise<ItemLock | null> {
  return prisma.itemLock.findUnique({where: {itemId: id}});
}

export async function lockItem(id: string): Promise<[BatchPayload, ItemLock]> {
  const userToken = await getUserToken();
  if (!userToken) {
    throw new Error('Unauthorized');
  }

  return prisma.$transaction([
    prisma.itemLock.deleteMany({
      where: {
        username: userToken.username
      }
    }),
    prisma.itemLock.create({
      data: {
        itemId: id,
        username: userToken.username
      }
    })
  ]);
}

export async function unlockItem(id: string) {
  return prisma.itemLock.delete({
    where: {
      itemId: id
    }
  });
}
