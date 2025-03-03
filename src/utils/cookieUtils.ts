import {cookies} from 'next/headers';
import {SerializedUserToken, UserToken, userTokenBuilder} from '@/models/UserToken';

export async function getUserToken(): Promise<UserToken | undefined> {
  const cookieStore = await cookies();
  const userCookieValue = cookieStore.get('user')?.value;
  if (!userCookieValue) {
    return undefined;
  }
  return userTokenBuilder(JSON.parse(userCookieValue) as SerializedUserToken);
}

export async function getRefreshToken(): Promise<string | undefined> {
  return getUserToken()?.then(token => token?.refreshToken);
}

export async function getName(): Promise<string | undefined> {
  return getUserToken()?.then(token => token?.name);
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