type UserData = {
  id: string;
  email: string;
  type: string;
};

export type ShopDataType = {
  id: string;
  name: string;
  category: string;
  address1: string;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
  user: {
    item: UserData;
    href: string;
  };
};

export type SpecifyNoticeDataType = {
  id: string;
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
  closed: boolean;
  shop: {
    item: [];
    href: string;
  };
  currentUserApplication: null;
};

export type SpecifyNoticeApplicationsDataType = {
  item: {
    id: string;
    status: 'pending' | 'accepted' | 'rejected';
    createdAt: string;
    user: {
      item: {
        id: string;
        email: string;
        type: 'employer' | 'employee';
        name: string | undefined; // optional
        phone: string | undefined; // optional
        address: string | undefined; // optional
        bio: string | undefined; // optional
      };
      href: string;
    };
    shop: {
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
    };
    notice: {
      item: {
        id: string;
        hourlyPay: number;
        description: string;
        startsAt: string;
        workhour: number;
        closed: boolean;
      };
      href: string;
    };
  };
  links: [];
};
