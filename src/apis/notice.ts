import BASE_URL from '@/constants/BASEURL';
import { NoticeUploadDataType } from '@/types';

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

/* lint default 오류 방지 코드 -> 새로운 코드 추가 시 삭제 */
export const error = 0;
