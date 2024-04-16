'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useCallback } from 'react';
import { SEARCH_ICON, HEADER_LOGO } from '@/app/utils/constants';
import Notification from './notification';
import styles from './Header.module.scss';
import { ButtonListType, NotificationDataType } from './types';

const logout = () => {
  console.log('logout');
};

const BUTTON_LIST: ButtonListType = {
  none: {
    buttonList: [
      { name: '로그인', href: '/signin' },
      { name: '회원가입', href: '/signup' },
    ],
    notification: false,
  },
  owner: {
    buttonList: [
      { name: '내 가게', href: '/mystore' },
      { name: '로그아웃', href: '', onClick: logout },
    ],
    notification: true,
  },
  worker: {
    buttonList: [
      { name: '내 프로필', href: '/myprofile' },
      { name: '로그아웃', href: '', onClick: logout },
    ],
    notification: true,
  },
};

type HeaderProps = {
  memberType: string;
  notificationListData: NotificationDataType[];
};
export default function Header({ memberType, notificationListData }: HeaderProps) {
  const buttonType = BUTTON_LIST[memberType];
  const [notificationData, setNotificationData] = useState<NotificationDataType[]>(notificationListData);
  const [notificationNumber, setNotificationNumber] = useState(notificationData.length);

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

  return (
    <div className={styles.wrapper}>
      <div className={styles.contentWrapper}>
        <Image src={HEADER_LOGO} alt="logo" width={112} height={40} className={styles.logo} priority />
        <form className={styles.searchBarWrapper}>
          <Image src={SEARCH_ICON} alt="search" width={20} height={20} className={styles.searchButton} priority />
          <input className={styles.searchBar} placeholder="가게 이름으로 찾아보세요" />
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
