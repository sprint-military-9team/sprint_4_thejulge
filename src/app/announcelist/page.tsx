'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/common/Header/Header';
import Footer from '@/components/common/Footer/Footer';
import Announce from '@/components/announcelist/Announce/Announce';
import SuggestCard from '@/components/announcelist/SuggestCard/SuggestCard';
import styles from './page.module.scss';

export default function Home() {
  const params = useSearchParams();
  const headerData = params.get('keyword');
  const headerDataExisted = headerData
    ? `${styles.suggestWrapper} ${styles.headerDataExisted}`
    : `${styles.suggestWrapper}`;

  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.content}>
        <div className={styles.wrapper}>
          <article className={headerDataExisted}>
            <SuggestCard residence="서울시 중구" />
          </article>
          <main className={styles.mainWrapper}>
            <Announce headerData={headerData} />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
