import Image from 'next/image';
import Link from 'next/link';
import { HEADER_LOGO } from '@/utils/constants';
import { cookies } from 'next/headers';
import Notification from './notification';
import styles from './Header.module.scss';
import { ButtonListType } from './types';
import SearchBox from './SearchBox';
import LogoutButton from './LogoutButton';
import DarkModeButton from '../Button/DarkModeButton';

export default function Header() {
  const cookieStore = cookies();
  const memberType = cookieStore.get('type')?.value ?? 'none';

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
        { name: '로그아웃', href: '' },
      ],
      notification: true,
    },
    employee: {
      buttonList: [
        { name: '내 프로필', href: '/profile' },
        { name: '로그아웃', href: '' },
      ],
      notification: true,
    },
  };
  const buttonType = BUTTON_LIST[memberType];

  return (
    <div className={styles.wrapper}>
      <div className={styles.contentWrapper}>
        <a href="/">
          <Image src={HEADER_LOGO} alt="logo" width={112} height={40} className={styles.logo} priority />
        </a>
        <SearchBox />
        <div className={memberType === 'none' ? styles.buttonWrapperSmall : styles.buttonWrapper}>
          {buttonType.buttonList.map((button) =>
            button.name === '로그아웃' ? (
              <LogoutButton key="로그아웃" />
            ) : (
              <Link href={button.href} key={button.name}>
                <div className={styles.button}>{button.name}</div>
              </Link>
            ),
          )}
          {buttonType.notification && <Notification />}
          <DarkModeButton />
        </div>
      </div>
    </div>
  );
}
