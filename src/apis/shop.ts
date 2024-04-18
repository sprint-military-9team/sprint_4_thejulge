import BASE_URL from '@/constants/BASEURL';
import { ShopDataType } from '@/types';

export const getShopData = async (shopId: string): Promise<ShopDataType> => {
  const data = await fetch(`${BASE_URL}/shops/${shopId}`, {
    method: 'GET',
    cache: 'no-store',
  }).then((response) => response.json());
  return data.item;
};

/* lint default 오류 방지 코드 -> 새로운 코드 추가 시 삭제 */
export const error = 0;
