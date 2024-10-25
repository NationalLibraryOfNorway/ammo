import {NextRequest, NextResponse} from 'next/server';
import {ItemLock} from '@prisma/client';
import prisma from '@/lib/prisma';

interface IdParams { params: { itemId: string } }

async function doesLockExist(itemId: string) {
  return prisma.itemLock.findUnique({ where: {itemId} });
}

export async function GET(): Promise<NextResponse> {
  const locks = await prisma.itemLock.findMany();
  return NextResponse.json(locks, {status: 200});
}

// Create an item lock: POST /api/lock
export async function POST(req: NextRequest): Promise<NextResponse> {
  const {itemId, username} = await req.json() as ItemLock;
  const exists = await doesLockExist(itemId);

  if (exists) {
    return NextResponse.json({error: 'Item already locked'}, {status: 409});
  }

  const item = await prisma.itemLock.create({
    data: {
      itemId,
      username
    }
  });

  // If the item is already locked, return a 409 Conflict
  console.log('POST /api/lock RESPONSE', item);

  return NextResponse.json(item, {status: 201});
}

// DELETE an item lock: DELETE /api/lock/:lockId
export async function DELETE(req: NextRequest, params: IdParams): Promise<NextResponse> {
  const exists = await doesLockExist(params.params.itemId);

  if (!exists) {
    return NextResponse.json({error: 'Item lock does not exist'}, {status: 404});
  }

  const lock = await prisma.itemLock.delete({
    where: {
      itemId: params.params.itemId
    }
  });

  return NextResponse.json(lock, {status: 204});
}