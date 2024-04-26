'use client';

import { useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import BASE_URL from '@/constants/BASEURL';
import { ShopDataContext } from '@/context/ShopDataContext';
import ShopInformation from './ShopInformation';
import ShopRegistration from './ShopRegistration';

export default function ShopInfo() {
  const { shopData, updateShopData } = useContext(ShopDataContext);
  const shopId = Cookies.get('shopId');

  useEffect(() => {
    if (shopId) {
      const fetchData = async () => {
        const result = await fetch(`${BASE_URL}/shops/${shopId}`);
        const data = await result.json();
        updateShopData(data.item);
      };
      fetchData();
    }
  }, [shopId]);

  return shopData.id ? <ShopInformation /> : <ShopRegistration />;
}
