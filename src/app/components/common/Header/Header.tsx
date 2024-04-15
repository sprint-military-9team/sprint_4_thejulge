'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import styles from './Header.module.scss';

type NotificationDataType = {
  id: string;
  name: string;
  startsAt: string;
  createdAt: string;
  result: string;
  read: boolean;
};

type ButtonType = {
  name: string;
  href: string;
  onClick?: () => void;
};

type ButtonListType = {
  [key: string]: {
    buttonList: ButtonType[];
    notification: boolean;
  };
};

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

interface HeaderProps {
  memberType: string;
  notificationListData: NotificationDataType[];
}
export default function Header({ memberType, notificationListData }: HeaderProps) {
  const buttonType = BUTTON_LIST[memberType];
  const [isOpen, setIsOpen] = useState(false);
  const [notificationData, setNotificationData] = useState(notificationListData);
  const notificationNumber = notificationData.length;
  const notificationRef = useRef<HTMLDivElement>(null);
  const handleClickNotificationButton = () => {
    setIsOpen((previousStatus) => !previousStatus);
  };
  const handleClickCloseButton = () => {
    setIsOpen(false);
  };
  const handleClickNotification = (event: React.MouseEvent<HTMLDivElement>) => {
    /* api function */
    const notificationId = event.currentTarget.id;
    setNotificationData((previousData) =>
      previousData.map((notification) =>
        notification.id === notificationId ? { ...notification, read: true } : notification,
      ),
    );
    console.log(notificationData);
  };
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (isOpen && notificationRef.current && !notificationRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);

    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  /* 창 닫았을 때, 읽었던 데이터 삭제 */
  useEffect(() => {
    if (!isOpen) {
      setNotificationData((previousData) => previousData.filter((notification) => !notification.read && notification));
    }
  }, [isOpen]);

  return (
    <div className={styles.wrapper}>
      <Image src="/header_logo.svg" alt="logo" width={112} height={40} className={styles.logo} priority />
      <div className={styles.searchBarWrapper}>
        <Image src="/search.svg" alt="search" width={20} height={20} className={styles.searchButton} priority />
        <input className={styles.searchBar} placeholder="가게 이름으로 찾아보세요" />
      </div>
      <div className={styles.buttonWrapper}>
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
          <div className={styles.notification}>
            <Image
              src={notificationNumber ? '/notification_active.svg' : '/notification_inactive.svg'}
              alt="notification"
              width={20}
              height={20}
              onClick={handleClickNotificationButton}
              role="presentation"
            />
            {isOpen && (
              <div className={styles.notificationWindow} ref={notificationRef}>
                <div className={styles.notificationTitleWrapper}>
                  <div className={styles.notificationTitle}>{`알림 ${notificationNumber}개`}</div>
                  <Image
                    src="/close.svg"
                    alt="close"
                    width={24}
                    height={24}
                    className={styles.notificationClose}
                    onClick={handleClickCloseButton}
                  />
                </div>
                <div className={styles.notificationList}>
                  {notificationData.map((notification) => (
                    <div
                      id={notification.id}
                      key={notification.id}
                      className={notification.read ? styles.notificationReadWrapper : styles.notificationWrapper}
                      onClick={handleClickNotification}
                      role="presentation"
                    >
                      <div
                        className={
                          notification.result === 'accepted' ? styles.notificationBlueFin : styles.notificationRedFin
                        }
                      />
                      <div className={styles.notificationText}>
                        HS 과일주스(2023-01-14 15:00~18:00) 공고 지원이&nbsp;
                        <span
                          className={
                            notification.result === 'accepted'
                              ? styles.notificationBlueStatus
                              : styles.notificationRedStatus
                          }
                        >
                          {notification.result === 'accepted' ? '승인' : '거절'}
                        </span>
                        되었어요.
                      </div>
                      <div className={styles.notificationDate}>7분전</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
