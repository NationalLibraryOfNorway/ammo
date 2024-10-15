import {NextResponse} from 'next/server';
import {promises as fs} from 'fs';
import {Item} from '@/models/Item';

// GET /api/items
export async function GET(): Promise<NextResponse> {
  // TODO: Replace with actual data once in place
  const file = await fs.readFile(process.cwd() + '/src/dummy-data.json', 'utf8');
  const data = JSON.parse(file) as Item[];

  return NextResponse.json(data, {status: 200});
}