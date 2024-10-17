import {NextResponse} from 'next/server';
import {NewspaperMetadata} from '@/models/NewspaperMetadata';

// GET /api/items/:id
// eslint-disable-next-line @typescript-eslint/require-await
export async function GET(): Promise<NextResponse> {
  // TODO: Replace with actual data once in place
  const dummyMetadata: NewspaperMetadata = {
    title: 'Dagbladet',
    date: '2024-08-27',
    editionNumber: '195',
    volume: '154'
  };
  return NextResponse.json(dummyMetadata, {status: 200});
}