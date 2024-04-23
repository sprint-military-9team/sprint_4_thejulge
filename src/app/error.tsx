'use client';

import Link from 'next/link';
import styles from './Error.module.scss';

const errorDescription = {
  '404': '접근할 수 없는 페이지입니다',
  '500': '서버오류입니다.',
};

export default function Error({ error }: { error: { message: '404' | '500' } }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{error.message}</h1>
      <p className={styles.description}>{errorDescription[error.message]}</p>
      <Link href="/">
        <button className={styles.button} type="button">
          홈으로 가기
        </button>
      </Link>
    </div>
  );
}
