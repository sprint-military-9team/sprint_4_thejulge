import BASE_URL from '@/constants/BASEURL';
import { AnnounceShopType, UserApplicationDataType } from '@/types/announceShopType';

export const postApplicationNotice = async (
  shopId: string | null,
  noticeId: string | null,
  token: string,
): Promise<AnnounceShopType> => {
  const response = await fetch(`${BASE_URL}/shops/${shopId}/notices/${noticeId}/applications`, {
    method: 'POST',
    headers: {
      Accept: '*/*',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error(`${response.status}`);
  }
  const data: AnnounceShopType = await response.json();
  return data;
};

export const putApplicationNotice = async (
  shopId: string | null,
  noticeId: string | null,
  token: string,
  applicationId: string,
  status: 'pending' | 'accepted' | 'rejected' | 'canceled',
): Promise<AnnounceShopType> => {
  const response = await fetch(`${BASE_URL}/shops/${shopId}/notices/${noticeId}/applications/${applicationId}`, {
    method: 'PUT',
    headers: {
      Accept: '*/*',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) {
    throw new Error(`${response.status}`);
  }
  const data: AnnounceShopType = await response.json();
  return data;
};

export const getUserApplication = async (
  userId: string | undefined,
  token: string | undefined,
  offset: number,
  limit: number,
): Promise<UserApplicationDataType> => {
  const response = await fetch(`${BASE_URL}/users/${userId}/applications?offset=${offset}&limit=${limit}`, {
    method: 'GET',
    headers: {
      Accept: '*/*',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error(`${response.status}`);
  }
  const data: UserApplicationDataType = await response.json();
  return data;
};
