import BASE_URL from '@/constants/BASEURL';
import { SpecifyNoticeDataType } from '@/types';

export const getSpecifyNoticeData = async (shopId: string, noticeId: string): Promise<SpecifyNoticeDataType> => {
  const response = await fetch(`${BASE_URL}/shops/${shopId}/notices/${noticeId}`, {
    method: 'GET',
    cache: 'no-store',
  });
  if (!response.ok) {
    throw Error('API 오류');
  }
  const data = await response.json();
  return data.item;
};

/* lint default 오류 방지 코드 -> 새로운 코드 추가 시 삭제 */
export const error = 0;
