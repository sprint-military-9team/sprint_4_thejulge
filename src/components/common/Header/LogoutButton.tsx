'use client';

import Cookies from 'js-cookie';
import styles from './Header.module.scss';

export default function LogoutButton() {
  const handleClickButton = () => {
    const removeData = ['id', 'token', 'type', 'shopId', 'userId'];
    removeData.forEach((data) => Cookies.remove(data));
    window.location.reload();
  };

  return (
    <div className={styles.button} onClick={handleClickButton} role="presentation">
      로그아웃
    </div>
  );
}
