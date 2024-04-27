import BASE_URL from '@/constants/BASEURL';
import { AnnounceShopType, UserApplicationDataType } from '@/types/announceShopType';

export const postApplicationNotice = async (
  shopId: string | null,
  noticeId: string | null,
  token: string,
): Promise<AnnounceShopType> => {
  try {
    const response = await fetch(`${BASE_URL}/shops/${shopId}/notices/${noticeId}/applications`, {
      method: 'POST',
      headers: {
        Accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('API 전송에 실패했습니다.');
    }
    const data: AnnounceShopType = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const putApplicationNotice = async (
  shopId: string | null,
  noticeId: string | null,
  token: string,
  applicationId: string,
  status: 'pending' | 'accepted' | 'rejected' | 'canceled',
): Promise<AnnounceShopType> => {
  try {
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
      throw new Error('API 전송에 실패했습니다.');
    }
    const data: AnnounceShopType = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserApplication = async (
  userId: string | undefined,
  token: string | undefined,
  offset: number,
  limit: number,
): Promise<UserApplicationDataType> => {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}/applications?offset=${offset}&limit=${limit}`, {
      method: 'GET',
      headers: {
        Accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('API 호출에 실패했습니다.');
    }
    const data: UserApplicationDataType = await response.json();
    return data;
  } catch (error) {
    console.error('API 호출 실패:', error);
    throw error;
  }
};
