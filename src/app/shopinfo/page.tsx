'use client';

import Cookies from 'js-cookie';
import ShopInformation from './ShopInformation';
import ShopRegistration from './ShopRegistration';

export default function ShopInfo() {
  const shopId = Cookies.get('shopId');

  return shopId ? <ShopInformation /> : <ShopRegistration />;
}
