import {NextRequest, NextResponse} from 'next/server';
import {TextItem} from '@/models/TextItem';

interface IdParams { params: { id: string} }

// GET /api/items/:id
// eslint-disable-next-line @typescript-eslint/require-await
export async function GET(req: NextRequest, params: IdParams): Promise<NextResponse> {
  // TODO: Replace with actual data once in place
  const dummyItem: TextItem = {
    id: params.params.id,
    extractedMetadata: {
      title: 'Dagbladet (Oslo: 1869-)',
      titleId: '1600000882',
      date: '2024-08-27',
      editionNumber: '195',
      volume: '154'
    }
  };
  return NextResponse.json(dummyItem, {status: 200});
}

// POST /api/items/:id
// eslint-disable-next-line @typescript-eslint/require-await
export async function POST(): Promise<NextResponse> {
  return NextResponse.json({status: 201});
}