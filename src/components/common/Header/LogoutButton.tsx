'use client';

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import styles from './Header.module.scss';

export default function LogoutButton() {
  const router = useRouter();
  const handleClickButton = () => {
    const removeData = ['id', 'token', 'type', 'shopId', 'userId'];
    removeData.forEach((data) => Cookies.remove(data));
    router.push('/');
    router.refresh();
  };

  return (
    <div className={styles.button} onClick={handleClickButton} role="presentation">
      로그아웃
    </div>
  );
}
