import BASE_URL from '@/constants/BASEURL';
import Cookies from 'js-cookie';
import { NotificationDataType } from '@/components/common/Header/types';

type AlertDataType = {
  item: {
    id: string;
    createdAt: string;
    read: boolean;
    result: string;
    notice: { item: { startsAt: string; workhour: string } };
    shop: { item: { name: string } };
  };
};

export const getUserAlert = async (): Promise<NotificationDataType[] | number> => {
  const userId = Cookies.get('userId');
  const token = Cookies.get('token');
  const response = await fetch(`${BASE_URL}/users/${userId}/alerts`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    return response.status;
  }
  const data = await response.json();
  const alertList = data.items;
  const notificationData: NotificationDataType[] = alertList.map((alertData: AlertDataType) => {
    const {
      id,
      createdAt,
      read,
      result,
      notice: {
        item: { startsAt, workhour },
      },
      shop: {
        item: { name },
      },
    } = alertData.item;
    return { id, name, startsAt, createdAt, workhour, result, read };
  });
  const filteredData = notificationData.filter((alertData) => !alertData.read);
  return filteredData;
};

export const error = 0;
