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

export interface SortButtonProps {
  selected: string;
  onClick: () => void;
  isSortOpen: boolean;
}
export interface FilterButtonProps {
  count: number | undefined;
  onClick: () => void;
}
export interface SortListProps {
  onClick: (sort: string) => void;
}

export interface FilterInfo {
  location: string[];
  startAt: string | null;
  pay: number | null;
}
