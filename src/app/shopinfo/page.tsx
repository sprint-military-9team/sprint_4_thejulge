'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import ShopInformation from './ShopInformation';
import ShopRegistration from './ShopRegistration';

export default function ShopInfo() {
  const shopId = Cookies.get('shopId');
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return shopId ? <ShopInformation /> : <ShopRegistration />;
}
