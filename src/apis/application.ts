import BASE_URL from '@/constants/BASEURL';
import { SpecifyNoticeApplicationsDataType } from '@/types';

export const getSpecifyNoticeApplicationData = async (
  shopId: string,
  noticeId: string,
): Promise<SpecifyNoticeApplicationsDataType[]> => {
  const data = await fetch(`${BASE_URL}/shops/${shopId}/notices/${noticeId}/applications`, {
    method: 'GET',
  }).then((response) => response.json());
  console.log(data.items);
  return data.items;
};

/* lint default 오류 방지 코드 -> 새로운 코드 추가 시 삭제 */
export const error = 0;
