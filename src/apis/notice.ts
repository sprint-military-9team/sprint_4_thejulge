import BASE_URL from '@/constants/BASEURL';
import { SpecifyNoticeDataType, NoticeUploadDataType } from '@/types';
import Cookies from 'js-cookie';

export const getSpecifyNoticeData = async (shopId: string, noticeId: string): Promise<SpecifyNoticeDataType> => {
  const response = await fetch(`${BASE_URL}/shops/${shopId}/notices/${noticeId}`, {
    method: 'GET',
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error('가게 특정 공고 조회 오류');
  }
  const data = await response.json();
  return data.item;
};

export const postNotice = async (data: NoticeUploadDataType) => {
  const token = Cookies.get('token');
  const shopId = Cookies.get('shopId');
  const response = await fetch(`${BASE_URL}/shops/${shopId}/notices`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    if (response.status === 403) {
      throw new Error('가게 공고 수정 오류');
    }
    return { data: null, error: response.status };
  }
  const noticeData = await response.json();
  return { data: noticeData.item.id, error: null };
};

export const putSpecifyNotice = async (noticeId: string, data: NoticeUploadDataType) => {
  const shopId = Cookies.get('shopId');
  const token = Cookies.get('token');
  const response = await fetch(`${BASE_URL}/shops/${shopId}/notices/${noticeId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (response.status === 403) {
    throw new Error('가게 공고 생성 오류');
  }
  return response.status;
};
