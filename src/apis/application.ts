import BASE_URL from '@/constants/BASEURL';
import { SpecifyNoticeApplicationsDataType } from '@/types';

export const getSpecifyNoticeApplicationData = async (
  shopId: string,
  noticeId: string,
): Promise<SpecifyNoticeApplicationsDataType[]> => {
  const response = await fetch(`${BASE_URL}/shops/${shopId}/notices/${noticeId}/applications`, {
    method: 'GET',
  });
  if (!response.ok) {
    throw Error('API 오류');
  }
  const data = await response.json();
  return data.items;
};

export const setSpecifyNoticeApplicationStatus = async (
  shopId: string,
  noticeId: string,
  applicationId: string,
  status: 'accepted' | 'rejected',
) => {
  const response = await fetch(`${BASE_URL}/shops/${shopId}/notices/${noticeId}/applications/${applicationId}`, {
    method: 'PUT',
    body: JSON.stringify({
      status,
    }),
  });
  if (!response.ok) {
    throw Error('API 오류');
  }
};
