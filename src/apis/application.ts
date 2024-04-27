import BASE_URL from '@/constants/BASEURL';
import { SpecifyNoticeApplicationsDataType, UserApplicationDataType } from '@/types';
import Cookies from 'js-cookie';

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
): Promise<number | null> => {
  const token = Cookies.get('token');
  const response = await fetch(`${BASE_URL}/shops/${shopId}/notices/${noticeId}/applications/${applicationId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      status,
    }),
  });
  if (!response.ok) {
    return response.status;
  }

  return null;
};

export const getUserApplicationData = async (
  token: string,
  userId: string,
  limit?: number,
  offset?: number,
): Promise<{ count: number; items: UserApplicationDataType[] }> => {
  const response = await fetch(`${BASE_URL}/users/${userId}/applications?offset=${offset}&limit=${limit}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error(`${response.statusText}`);
  }
  const data = await response.json();
  return { count: data.count, items: data.items };
};
