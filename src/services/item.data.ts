import {NextResponse} from 'next/server';
import {NewspaperMetadata} from '@/models/NewspaperMetadata';
import {TextItem} from '@/models/TextItem';
import {ItemImage} from '@/models/ItemImage';
import {ItemLock} from '@prisma/client';

export async function getAllItems(): Promise<ItemImage[]> {
  return await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/items`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (response.ok) {
        return response.json() as Promise<ItemImage[]>;
      }
      return Promise.reject(new Error('Failed to fetch items'));
    });
}

export function getItemImage(id: string): Promise<NextResponse> {
  const baseLink = process.env.NEXT_PUBLIC_IMAGE_API_PATH;
  return Promise.resolve(NextResponse.json(`${baseLink}${id}-1_001_hovedavis/full/full/0/native.jpg`, {status: 200}));
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

export async function lockItem(itemId: string, username: string): Promise<NextResponse> {
  return await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/lock`, {
    method: 'POST',
    body: JSON.stringify({itemId, username}),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (response.ok) {
        return NextResponse.json({message: 'Item locked'}, {status: 201});
      }
      else if (response.status === 409) {
        return NextResponse.json({error: 'Item already locked'}, {status: 409});
      }
      return NextResponse.json({error: 'Could not lock item'}, {status: 500});
    });
}

export async function getAllLocks(): Promise<NextResponse> {
  return await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/lock`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(async response => {
      if (!response.ok) {
        return NextResponse.json({error: 'Failed to fetch locks'}, {status: response.status});
      }
      return NextResponse.json(await response.json() as ItemLock[], {status: 200});
    })
    .catch((e: Error) => {
      return NextResponse.json({error: `Failed to fetch locks: ${e.message}`}, {status: 500});
    });
}