export type NoticeInformationDataType = {
  id: string;
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
  closed: boolean;
};

export type StoreInformationDataType = {
  id: string;
  name: string;
  category: string;
  address1: string;
  description: string;
  imageUrl: string;
  originalHourPay: number;
};
