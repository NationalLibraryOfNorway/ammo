import {NextResponse} from 'next/server';

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