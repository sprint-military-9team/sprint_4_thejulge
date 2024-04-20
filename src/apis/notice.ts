import BASE_URL from '@/constants/BASEURL';
import { SpecifyNoticeDataType, NoticeUploadDataType } from '@/types';

export const getSpecifyNoticeData = async (shopId: string, noticeId: string): Promise<SpecifyNoticeDataType> => {
  const response = await fetch(`${BASE_URL}/shops/${shopId}/notices/${noticeId}`, {
    method: 'GET',
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error('API 오류');
  }
  const data = await response.json();
  return data.item;
};

export const postNotice = async (shopId: string, data: NoticeUploadDataType) => {
  const response = await fetch(`${BASE_URL}/shops/${shopId}/notices`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    return false;
  }
  return true;
};
