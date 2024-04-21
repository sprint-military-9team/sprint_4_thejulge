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

export const putUserProfile = async (
  userId: string,
  body: { name: string; phone: string; address: string; bio: string },
) => {
  const response = await fetch(`${BASE_URL}/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0ODk2YzJhNi0zYzI0LTRmMjYtOWY1ZC04NGM0YjEzZGI0ZmQiLCJpYXQiOjE3MTM1ODAwNDd9.qUvw9FZS0s9sCSGniTimOVsR6bM1ej8Sh7bKPX3bpZA`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error('API 오류');
  }
};

export const error = 0;
