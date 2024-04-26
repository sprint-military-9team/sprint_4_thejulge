export interface AnnounceShopType {
  item: ApplicationItem;
  links: Link[];
}

interface ApplicationItem {
  id: string;
  status: 'pending' | 'accepted' | 'rejected' | 'canceled';
  createdAt: string;
  user: {
    item: User;
    href: string;
  };
  shop: {
    item: Shop;
    href: string;
  };
  notice: {
    item: Notice;
    href: string;
  };
}

interface User {
  id: string;
  email: string;
  type: 'employee' | 'employer';
  name: string;
  phone: string;
  address: string;
  bio: string;
}

interface Shop {
  id: string;
  name: string;
  category: string;
  address1: string;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
}

interface Notice {
  id: string;
  hourlyPay: number;
  description: string;
  startsAt: string;
  workhour: number;
  closed: boolean;
}

interface Link {
  rel: string;
  description: string;
  method: 'GET' | 'PUT';
  href: string;
  body?: {
    status: 'accepted' | 'rejected';
  };
}

// getusernotice

export interface UserApplicationDataType {
  offset: number;
  limit: number;
  count: number;
  hasNext: boolean;
  items: ApplicationDetail[];
  links: GeneralLink[];
}

interface ApplicationDetail {
  item: {
    id: string;
    status: string;
    createdAt: string;
    shop: ShopDetail;
    notice: NoticeDetail;
  };
  links: GeneralLink[];
}

interface ShopDetail {
  item: {
    id: string;
    name: string;
    category: string;
    address1: string;
    address2: string;
    description: string;
    imageUrl: string;
    originalHourlyPay: number;
  };
  href: string;
}

interface NoticeDetail {
  item: {
    id: string;
    hourlyPay: number;
    description: string;
    startsAt: string;
    workhour: number;
    closed: boolean;
  };
  href: string;
}

interface GeneralLink {
  rel: string;
  description: string;
  method: string;
  href: string;
}
