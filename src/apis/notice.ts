import BASE_URL from '@/constants/BASEURL';
import { SpecifyNoticeDataType, NoticeUploadDataType } from '@/types';
import Cookies from 'js-cookie';

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
  const token = Cookies.get('token');
  const response = await fetch(`${BASE_URL}/shops/${shopId}/notices`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    return false;
  }
  const noticeData = await response.json();
  return noticeData.item.id;
};

export const putSpecifyNotice = async (noticeId: string, data: NoticeUploadDataType) => {
  /* const shopId = Cookies.get('shopId'); */
  const shopId = 'd3398bdc-4f7b-4457-b6b6-588928dc7e2f';
  const token = Cookies.get('token');
  const response = await fetch(`${BASE_URL}/shops/${shopId}/notices/${noticeId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    return false;
  }
  return true;
};
