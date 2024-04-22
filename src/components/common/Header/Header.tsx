'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useCallback, useEffect } from 'react';
import { SEARCH_ICON, HEADER_LOGO } from '@/utils/constants';
import Cookies from 'js-cookie';
import Notification from './notification';
import styles from './Header.module.scss';
import { ButtonListType, NotificationDataType } from './types';

type HeaderProps = {
  notificationListData?: NotificationDataType[];
};
export default function Header({ notificationListData }: HeaderProps) {
  /* 
  notificationListData 샘플 데이터
  const data = [
    {
      id: '1',
      name: 'test1',
      startsAt: '2024-04-16T15:00:00.000Z',
      createdAt: '2024-04-15T15:06:15.633Z',
      workhour: 3,
      result: 'accepted',
      read: false,
    },
    {
      id: '2',
      name: 'test2',
      startsAt: '2024-04-16T15:00:00.000Z',
      createdAt: '2024-04-12T15:06:15.633Z',
      workhour: 6,
      result: 'rejected',
      read: false,
    },
    {
      id: '3',
      name: 'test3',
      startsAt: '2024-04-16T15:00:00.000Z',
      createdAt: '2024-03-19T15:06:15.633Z',
      workhour: 12,
      result: 'rejected',
      read: false,
    },
    {
      id: '4',
      name: 'test4',
      startsAt: '2024-04-16T15:00:00.000Z',
      createdAt: '2023-03-15T15:06:15.633Z',
      workhour: 4,
      result: 'rejected',
      read: false,
    },
    {
      id: '5',
      name: 'test5',
      startsAt: '2024-04-16T15:00:00.000Z',
      createdAt: '2024-04-16T15:06:15.633Z',
      workhour: 4,
      result: 'rejected',
      read: false,
    },
  ]; */
  const [memberType, setMemberType] = useState('none');
  const [notificationData, setNotificationData] = useState<NotificationDataType[]>(notificationListData ?? []);
  const [notificationNumber, setNotificationNumber] = useState(notificationData.length);
  const [input, setInput] = useState('');
  const logout = () => {
    const removeData = ['id', 'token', 'type', 'shopId'];
    removeData.map((data) => Cookies.remove(data));
    setMemberType('none');
  };

  const BUTTON_LIST: ButtonListType = {
    none: {
      buttonList: [
        { name: '로그인', href: '/signin' },
        { name: '회원가입', href: '/signup' },
      ],
      notification: false,
    },
    employer: {
      buttonList: [
        { name: '내 가게', href: '/mystore' },
        { name: '로그아웃', href: '', onClick: logout },
      ],
      notification: true,
    },
    employee: {
      buttonList: [
        { name: '내 프로필', href: '/myprofile' },
        { name: '로그아웃', href: '', onClick: logout },
      ],
      notification: true,
    },
  };
  const buttonType = BUTTON_LIST[memberType];
  const handleClickNotification = useCallback((event: React.MouseEvent<HTMLDivElement>, isRead: boolean) => {
    if (isRead) {
      return;
    }
    /* api function */
    const notificationId = event.currentTarget.id;
    setNotificationData((previousData) =>
      previousData.map((notification) =>
        notification.id === notificationId ? { ...notification, read: true } : notification,
      ),
    );
    setNotificationNumber((previousCount) => previousCount - 1);
  }, []);

  const changeNotificationData = useCallback(() => {
    setNotificationData((previousData) => previousData.filter((notification) => !notification.read && notification));
  }, []);
  const router = useRouter();
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && input) {
      router.push(`/announcelist?keyword=${input}`);
    }
  };
  useEffect(() => {
    const type = Cookies.get('type');
    if (type === 'employer' || type === 'employee') {
      setMemberType(type);
      return;
    }
    setMemberType('none');
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.contentWrapper}>
        <Link href="/">
          <Image src={HEADER_LOGO} alt="logo" width={112} height={40} className={styles.logo} priority />
        </Link>
        <form className={styles.searchBarWrapper} onSubmit={(e) => e.preventDefault()}>
          <Image src={SEARCH_ICON} alt="search" width={20} height={20} className={styles.searchButton} priority />
          <input
            className={styles.searchBar}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="가게 이름으로 찾아보세요"
          />
        </form>
        <div className={memberType === 'none' ? styles.buttonWrapperSmall : styles.buttonWrapper}>
          {buttonType.buttonList.map((button) =>
            button.onClick ? (
              <div className={styles.button} key={button.name} onClick={button.onClick} role="presentation">
                {button.name}
              </div>
            ) : (
              <Link href={button.href} key={button.name}>
                <div className={styles.button}>{button.name}</div>
              </Link>
            ),
          )}
          {buttonType.notification && (
            <Notification
              notificationData={notificationData}
              notificationNumber={notificationNumber}
              handleClickNotification={handleClickNotification}
              changeNotificationData={changeNotificationData}
            />
          )}
        </div>
      </div>
    </div>
  );
}
