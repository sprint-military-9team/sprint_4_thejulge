import { SpecifyNoticeApplicationsDataType } from '@/types';

export interface MainData {
  item: Item;
}

interface Item {
  id: string;
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
  closed: boolean;
  shop: Shop;
  currentUserApplication: null;
}

interface Shop {
  item: ShopInfo;
  href: string;
}
interface ShopInfo {
  id: string;
  name: string;
  category: string;
  address1: string;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
}

export interface ButtonProps {
  status: 'pending' | 'accepted' | 'rejected' | 'canceled' | 'none';
  onClick: () => void | null;
}

export type ApplicationDataType = {
  count: number;
  items: SpecifyNoticeApplicationsDataType[];
};
