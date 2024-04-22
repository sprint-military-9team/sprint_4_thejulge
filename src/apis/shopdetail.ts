import { ShopDetailData } from '@/types/shopDetailPageType';

const BASE_URL = 'https://bootcamp-api.codeit.kr/api/0-1/the-julge';

const getShopDetailData = async (shopId: string | null, noticeId: string | null): Promise<ShopDetailData> => {
  try {
    const response = await fetch(`${BASE_URL}/shops/${shopId}/notices/${noticeId}`, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('API 호출에 실패했습니다.');
    }
    const data: ShopDetailData = await response.json();
    return data;
  } catch (error) {
    console.error('API호출 실패:', error);
    throw error;
  }
};

export default getShopDetailData;
