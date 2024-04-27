import { ShopDetailData } from '@/types/shopDetailPageType';
import BASE_URL from '@/constants/BASEURL';

const getShopDetailData = async (shopId: string | null, noticeId: string | null): Promise<ShopDetailData> => {
  const response = await fetch(`${BASE_URL}/shops/${shopId}/notices/${noticeId}`, {
    method: 'GET',
  });
  if (!response.ok) {
    throw new Error(`${response.status}`);
  }
  const data: ShopDetailData = await response.json();
  return data;
};

export default getShopDetailData;
