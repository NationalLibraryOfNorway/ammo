import {NextRequest, NextResponse} from 'next/server';
import prisma from '@/lib/prisma';

interface IdParams { params: { id: string} }

export async function GET(req: NextRequest, params: IdParams): Promise<NextResponse> {
  const itemId = params.params.id;
  const item = await prisma.itemLock.findUnique({ where: {itemId} });

  if (!item) {
    return NextResponse.json({error: 'No item lock found'}, {status: 404});
  }

  return NextResponse.json(item, {status: 200});
}

// Delete an item lock: DELETE /api/lock/:lockId
export async function DELETE(req: NextRequest, params: IdParams): Promise<NextResponse> {
  console.log('Deleting lock for item', params.params.id);
  await prisma.itemLock.delete({
    where: {
      itemId: params.params.id
    }
  });

  return NextResponse.json({status: 204});
}