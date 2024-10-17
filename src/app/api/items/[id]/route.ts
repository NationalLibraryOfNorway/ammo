import {NextRequest, NextResponse} from 'next/server';
import {Item} from '@/models/Item';

interface IdParams { params: { id: string} }

// GET /api/items/:id
// eslint-disable-next-line @typescript-eslint/require-await
export async function GET(): Promise<NextResponse> {
  // TODO: Replace with actual data once in place
  const id = 'dagbladet_null_null_20240827_156_198_1';
  const baseLink = process.env.IMAGE_API_URL;

  const dummyItem: Item = {
    id,
    thumbnail: `${baseLink}${id}-1_001_hovedavis/full/0,200/0/native.jpg`,
    image: `${baseLink}${id}-1_001_hovedavis/full/full/0/native.jpg`
  };
  return NextResponse.json(dummyItem, {status: 200});
}

// POST /api/items/:id
// eslint-disable-next-line @typescript-eslint/require-await
export async function POST(req: NextRequest, params: IdParams): Promise<NextResponse> {
  // TODO: Replace with actual API call once in place
  const id = params.params.id;
  const body = await req.json() as Item;
  console.log(`Creating metadata for item ${id} with body: ${JSON.stringify(body)}`);
  return NextResponse.json({status: 201});
}