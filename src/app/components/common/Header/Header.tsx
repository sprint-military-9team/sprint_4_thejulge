import Image from 'next/image';
import styles from './Header.module.scss';

export default function Header() {
  return (
    <div className={styles.wrapper}>
      <Image src="/header_logo.svg" alt="logo" width={112} height={40} className={styles.logo} />
      <div className={styles.searchBarWrapper}>
        <Image src="/search.svg" alt="search" width={20} height={20} className={styles.searchButton} />
        <input className={styles.searchBar} placeholder="가게 이름으로 찾아보세요" />
      </div>
      <div className={styles.buttonWrapper}>
        <div className={styles.button}>내 프로필</div>
        <div className={styles.button}>로그아웃</div>
        <div className={styles.notifiacation}>
          <Image src="/notification_active.svg" alt="notification" width={20} height={20} />
        </div>
      </div>
    </div>
  );
}
