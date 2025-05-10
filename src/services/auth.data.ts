import {User} from '@/models/UserToken';

export async function refresh(): Promise<User> {
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return await data.json() as User;
}