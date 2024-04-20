import BASE_URL from '@/constants/BASEURL';
import { SpecifyNoticeApplicationsDataType, UserApplicationDataType } from '@/types';

export const getSpecifyNoticeApplicationData = async (
  shopId: string,
  noticeId: string,
  offset: number,
  limit: number,
): Promise<{ count: number; items: SpecifyNoticeApplicationsDataType[] }> => {
  const response = await fetch(
    `${BASE_URL}/shops/${shopId}/notices/${noticeId}/applications?offset=${offset}&limit=${limit}`,
    {
      method: 'GET',
    },
  );
  if (!response.ok) {
    throw new Error('API 오류');
  }
  const data = await response.json();
  return { count: data.count, items: data.items };
};

export const setSpecifyNoticeApplicationStatus = async (
  shopId: string,
  noticeId: string,
  applicationId: string,
  status: 'accepted' | 'rejected',
) => {
  const response = await fetch(`${BASE_URL}/shops/${shopId}/notices/${noticeId}/applications/${applicationId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      status,
    }),
  });
  if (!response.ok) {
    throw new Error('API 오류');
  }
};

export const getUserApplicationData = async (
  userId: string,
  limit?: number,
  offset?: number,
): Promise<{ count: number; items: UserApplicationDataType[] }> => {
  const response = await fetch(`${BASE_URL}/users/${userId}/applications?offset=${offset}&limit=${limit}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0ODk2YzJhNi0zYzI0LTRmMjYtOWY1ZC04NGM0YjEzZGI0ZmQiLCJpYXQiOjE3MTM1ODAwNDd9.qUvw9FZS0s9sCSGniTimOVsR6bM1ej8Sh7bKPX3bpZA`,
    },
  });
  if (!response.ok) {
    throw new Error('API 오류');
  }
  const data = await response.json();
  return { count: data.count, items: data.items };
};
