'use client';

import Link from 'next/link';
import styles from './Error.module.scss';

export default function Error({ error }: { error: { message: string } }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{error.message}</h1>
      <p className={styles.description}>예상치 못한 오류가 발생했습니다</p>
      <Link href="/">
        <button className={styles.button} type="button">
          홈으로 가기
        </button>
      </Link>
    </div>
  );
}
