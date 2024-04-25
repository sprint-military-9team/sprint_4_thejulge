'use client';

import { ShopDataType } from '@/types';
import { createContext, useState, useMemo } from 'react';

export const ShopDataContext = createContext<{
  shopData: ShopDataType;
  updateShopData: (date: ShopDataType) => void;
}>({ shopData: {} as ShopDataType, updateShopData: () => { } });

export function ShopDataContextProvider({ children }: { children: React.ReactNode }) {
  const [shopData, setShopData] = useState<ShopDataType>({
    id: '',
    name: '',
    category: '',
    address1: '',
    address2: '',
    description: '',
    imageUrl: '',
    originalHourlyPay: 0,
    user: {
      item: { id: '', email: '', type: '' },
      href: '',
    },
  });
  const updateShopData = (data: ShopDataType) => {
    setShopData(data);
  };

  const contextValue = useMemo(() => ({ shopData, updateShopData }), [shopData, updateShopData]);

  return <ShopDataContext.Provider value={contextValue}>{children}</ShopDataContext.Provider>;
}
