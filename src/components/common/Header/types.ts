export type NotificationDataType = {
  id: string;
  name: string;
  startsAt: string;
  createdAt: string;
  workhour: number;
  result: string;
  read: boolean;
};

export type ButtonType = {
  name: string;
  href: string;
  onClick?: () => void;
};

export type ButtonListType = {
  [key: string]: {
    buttonList: ButtonType[];
    notification: boolean;
  };
};
