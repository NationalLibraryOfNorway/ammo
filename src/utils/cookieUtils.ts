import { cookies, type UnsafeUnwrappedCookies } from 'next/headers';
import {SerializedUserToken, UserToken, userTokenBuilder} from '@/models/UserToken';

export function getUserToken(): UserToken | undefined {
  const userCookieValue = (cookies() as unknown as UnsafeUnwrappedCookies).get('user')?.value;
  if (!userCookieValue) {
    return undefined;
  }
  return userTokenBuilder(JSON.parse(userCookieValue) as SerializedUserToken);
}

export function getRefreshToken(): string | undefined {
  return getUserToken()?.refreshToken;
}

export function getName(): string | undefined {
  return getUserToken()?.name;
}

export function getUsername(): string | undefined {
  return getUserToken()?.username;
}

export function deleteUserToken() {
  (cookies() as unknown as UnsafeUnwrappedCookies).delete('user');
}

export function setUserCookie(user: UserToken) {
  (cookies() as unknown as UnsafeUnwrappedCookies).set('user', JSON.stringify(user), {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/'
  });
}