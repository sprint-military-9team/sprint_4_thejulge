export interface Data {
  offset: number;
  limit: number;
  address: string[];
  count: number;
  hasNext: boolean;
  items: MainData[];
}

export interface MainData {
  item: Item;
  links: Link[];
}

interface Item {
  id: string;
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
  closed: boolean;
  shop: Shop;
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
interface Link {
  rel: string;
  description: string;
  method: string;
  href: string;
}
