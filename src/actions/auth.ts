'use server';

import {User, UserToken} from '@/models/UserToken';
import {ProblemDetail} from '@/models/ProblemDetail';
import {deleteUserToken, getRefreshToken, setUserCookie} from '@/utils/cookieUtils';

export async function signIn(code: string, redirectUrl: string): Promise<User> {
  const data = await fetch(`${process.env.AUTH_API_PATH}/login?${redirectUrl}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: code
  })
    .then(async response => {
      if (!response.ok) {
        const problemDetail = await response.json() as ProblemDetail;
        console.error('Error during sign-in:', problemDetail.detail, problemDetail.status);
      }
      return response;
    });

  if (!data.ok) {
    throw new Error('Error during sign-in');
  }

  const userToken = await data.json() as UserToken;

  if (!userToken || !userToken.name || !userToken.expires) {
    throw new Error('Invalid user token');
  }

  await setUserCookie(userToken);

  return {name: userToken.name, expires: userToken.expires, username: userToken.username};
}

export async function signOut(): Promise<void> {
  const refreshToken = await getRefreshToken();
  if (!refreshToken) {
    throw new Error('No refresh token found.');
  }

  return await fetch(`${process.env.AUTH_API_PATH}/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: refreshToken
  }).then(async res => {
    if (!res.ok) {
      throw new Error(`Failed to logout: ${res.status} ${res.statusText}`);
    }
    await deleteUserToken();
    return;
  }).catch((error: Error) => {
    throw error;
  });
}

export async function refresh(): Promise<User> {
  const refreshToken = await getRefreshToken();
  if (!refreshToken) {
    throw new Error('No refresh token found.');
  }

  const data = await fetch(`${process.env.AUTH_API_PATH}/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: refreshToken
  });

  const newToken = await data.json() as UserToken;

  if (!newToken || !newToken.name || !newToken.expires) {
    throw new Error('Failed to refresh token');
  }

  await setUserCookie(newToken);

  return {name: newToken.name, expires: newToken.expires, username: newToken.username};
}