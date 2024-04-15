'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import styles from './Header.module.scss';

interface HeaderProps {
  memberType: string;
}

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

export default function Header({ memberType }: HeaderProps) {
  const buttonType = BUTTON_LIST[memberType];
  const [isOpen, setIsOpen] = useState(false);
  const notifiacationRef = useRef<HTMLDivElement>(null);
  const handleClickNotificationButton = () => {
    setIsOpen((prev) => !prev);
  };
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (isOpen && notifiacationRef.current && !notifiacationRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);

    return () => document.removeEventListener('click', handleClickOutside);
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
            <div
              className={styles.button}
              key={button.name}
              onClick={button.onClick}
              onKeyUp={button.onClick}
              role="presentation"
            >
              {button.name}
            </div>
          ) : (
            <Link href={button.href} key={button.name}>
              <div className={styles.button}>{button.name}</div>
            </Link>
          ),
        )}
        {buttonType.notification && (
          <div className={styles.notifiacation}>
            <Image
              src="/notification_active.svg"
              alt="notification"
              width={20}
              height={20}
              onClick={handleClickNotificationButton}
              onKeyUp={handleClickNotificationButton}
              role="presentation"
            />
            {isOpen && (
              <div className={styles.notificationWindow} ref={notifiacationRef}>
                test
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
