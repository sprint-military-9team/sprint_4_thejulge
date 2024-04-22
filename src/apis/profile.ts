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

export const setUserProfile = async (
  userId: string,
  body: { name: string; phone: string; address: string; bio: string },
) => {
  const response = await fetch(`${BASE_URL}/usersa/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwNGJhZjRiZS01MmQ3LTRlMGQtOGRhOC0yMWE2NDZkOWE0MWMiLCJpYXQiOjE3MTM1Nzk5NjZ9.-Q28XqOjbWr5xSX20q0Y9gRmI8KqTrok7JYjTLw-tjc`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(String(response.status));
  }
};

export const error = 0;
