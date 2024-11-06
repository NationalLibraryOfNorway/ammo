import {NextRequest, NextResponse} from 'next/server';
import {ItemLock} from '@prisma/client';
import prisma from '@/lib/prisma';

// Get all item locks: GET /api/lock
export async function GET(): Promise<NextResponse> {
  const locks = await prisma.itemLock.findMany();
  return NextResponse.json(locks, {status: 200});
}

// Create an item lock: POST /api/lock
export async function POST(req: NextRequest): Promise<NextResponse> {
  const {itemId, username} = await req.json() as ItemLock;

  const item = await prisma.itemLock.create({
    data: {
      itemId,
      username
    }
  });

  return NextResponse.json(item, {status: 201});
}
