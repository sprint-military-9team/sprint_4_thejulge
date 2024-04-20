import BASE_URL from '@/constants/BASEURL';
import { UserProfileType } from '@/types';

export const getUserProfile = async (userId: string): Promise<UserProfileType> => {
  const response = await fetch(`${BASE_URL}/users/${userId}`, {
    method: 'GET',
  });
  if (!response.ok) {
    throw new Error('API 오류');
  }
  const data = await response.json();
  return data.item;
};

export const error = 0;
