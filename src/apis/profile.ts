import BASE_URL from '@/constants/BASEURL';
import { UserProfileType } from '@/types';
import Cookies from 'js-cookie';

export const getUserProfile = async (userId: string): Promise<UserProfileType> => {
  const response = await fetch(`${BASE_URL}/users/${userId}`, {
    method: 'GET',
  });
  if (!response.ok) {
    throw new Error(`${response.status}`);
  }
  const data = await response.json();
  return data.item;
};

export const setUserProfile = async (
  userId: string,
  body: { name: string; phone: string; address: string; bio: string },
) => {
  const token = Cookies.get('token');
  const response = await fetch(`${BASE_URL}/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    if (response.status === 400) {
      throw new Error((await response.json()).message);
    }
    if (response.status === 401 || response.status === 403) {
      throw new Error(`${response.status}`);
    }
    throw new Error(`unexpected error`);
  }
};

export const error = 0;
