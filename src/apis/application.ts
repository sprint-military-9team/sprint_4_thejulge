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
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwNGJhZjRiZS01MmQ3LTRlMGQtOGRhOC0yMWE2NDZkOWE0MWMiLCJpYXQiOjE3MTM1Nzk5NjZ9.-Q28XqOjbWr5xSX20q0Y9gRmI8KqTrok7JYjTLw-tjc`,
    },
  });
  if (!response.ok) {
    throw new Error('API 오류');
  }
  const data = await response.json();
  return { count: data.count, items: data.items };
};
