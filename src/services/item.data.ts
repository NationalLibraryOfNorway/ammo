import {NextResponse} from 'next/server';
import {NewspaperMetadata} from '@/models/NewspaperMetadata';

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

export async function getItem(id: string): Promise<NextResponse> {
  return await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/items/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(async response => {
      if (!response.ok) {
        return NextResponse.json({error: 'Failed to fetch item'}, {status: response.status});
      }
      return NextResponse.json(await response.json(), {status: 200});
    })
    .catch((e: Error) => {
      return NextResponse.json({error: `Failed to fetch item: ${e.message}`}, {status: 500});
    });
}

export async function getItemMetadata(id: string): Promise<NextResponse> {
  return await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/items/${id}/metadata`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(async response => {
      if (!response.ok) {
        return NextResponse.json({error: 'Failed to fetch item metadata'}, {status: response.status});
      }
      return NextResponse.json(await response.json(), {status: 200});
    })
    .catch((e: Error) => {
      return NextResponse.json({error: `Failed to fetch item metadata: ${e.message}`}, {status: 500});
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
          console.log('Failed to fetch POST approve on item');
          return NextResponse.json({error: `Failed to approve item: ${e.message}`}, {status: 500});
        });
    })
    .catch((e: Error) => {
      console.log('Failed to fetch POST on item');
      return NextResponse.json({error: `Failed to approve item: ${e.message}`}, {status: 500});
    });
}