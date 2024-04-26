'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { SEARCH_ICON, HEADER_LOGO } from '@/utils/constants';
import Cookies from 'js-cookie';
import Notification from './notification';
import styles from './Header.module.scss';
import { ButtonListType } from './types';

export default function Header() {
  const router = useRouter();
  const [memberType, setMemberType] = useState('none');
  const [input, setInput] = useState('');
  const logout = () => {
    const removeData = ['id', 'token', 'type', 'shopId', 'userId'];
    removeData.forEach((data) => Cookies.remove(data));
    setMemberType('none');
    router.refresh();
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
        { name: '내 가게', href: '/shopinfo' },
        { name: '로그아웃', href: '', onClick: logout },
      ],
      notification: true,
    },
    employee: {
      buttonList: [
        { name: '내 프로필', href: '/profile' },
        { name: '로그아웃', href: '', onClick: logout },
      ],
      notification: true,
    },
  };
  const buttonType = BUTTON_LIST[memberType];

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
          {buttonType.notification && <Notification />}
        </div>
      </div>
    </div>
  );
}
