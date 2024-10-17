import {NextResponse} from 'next/server';
import {NewspaperMetadata} from '@/models/NewspaperMetadata';
import {TextItem} from '@/models/TextItem';
import {ItemImage} from '@/models/ItemImage';

export async function getAllItems(): Promise<NextResponse> {
  return await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/items`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(async response => {
      if (!response.ok) {
        return NextResponse.json({error: 'Failed to fetch items'}, {status: response.status});
      }
      return NextResponse.json(await response.json(), {status: 200});
    })
    .catch((e: Error) => {
      return NextResponse.json({error: `Failed to fetch items: ${e.message}`}, {status: 500});
    });
}

export function getItemImage(id: string): Promise<NextResponse> {
  const baseLink = process.env.NEXT_PUBLIC_IMAGE_API_URL;

  const dummyItem: ItemImage = {
    id,
    thumbnail: `${baseLink}${id}-1_001_hovedavis/full/0,200/0/native.jpg`,
    image: `${baseLink}${id}-1_001_hovedavis/full/full/0/native.jpg`
  };
  return Promise.resolve(NextResponse.json(dummyItem, {status: 200}));
}

export async function getItemMetadata(id: string): Promise<NextResponse> {
  return await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/items/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(async response => {
      if (!response.ok) {
        return NextResponse.json({error: 'Failed to fetch item metadata TEST1'}, {status: response.status});
      }
      const item = await response.json() as TextItem;
      return NextResponse.json(item.extractedMetadata, {status: 200});
    })
    .catch((e: Error) => {
      return NextResponse.json({error: `Failed to fetch item metadata TEST33: ${e.message}`}, {status: 500});
    });
}

export async function approveItem(id: string, item: NewspaperMetadata): Promise<NextResponse> {
  return await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/items/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  })
    .then(async response => {
      if (!response.ok) {
        return NextResponse.json({error: 'Failed to create metadata for item'}, {status: response.status});
      }
      return await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/items/${id}/approve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(async approveResponse => {
          if (!approveResponse.ok) {
            return NextResponse.json({error: 'Failed to approve item'}, {status: approveResponse.status});
          }
          return NextResponse.json(await approveResponse.json(), {status: 200});
        })
        .catch((e: Error) => {
          return NextResponse.json({error: `Failed to approve item: ${e.message}`}, {status: 500});
        });
    })
    .catch((e: Error) => {
      return NextResponse.json({error: `Failed to approve item: ${e.message}`}, {status: 500});
    });
}