import { cookies } from 'next/headers';
import {SerializedUserToken, UserToken, userTokenBuilder} from '@/models/UserToken';

export async function getUserToken(): Promise<UserToken> {
  const cookieStore = await cookies();
  const userCookieValue = cookieStore.get('user')?.value;

  if (!userCookieValue) {
    return Promise.reject(new Error('No user token found'));
  }
  return userTokenBuilder(JSON.parse(userCookieValue) as SerializedUserToken);
}

export async function getRefreshToken(): Promise<string> {
  return await getUserToken().then(user => user.refreshToken);
}

export async function deleteUserToken() {
  const cookieStore = await cookies();
  cookieStore.delete('user');
}

export async function setUserCookie(user: UserToken) {
  const cookieStore = await cookies();
  cookieStore.set('user', JSON.stringify(user), {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/'
  });
}