import React from 'react';
import Header from '@/components/common/Header/Header';
import Footer from '@/components/common/Footer/Footer';
import Announce from '@/components/announcelist/Announce/Announce';
import SuggestCard from '@/components/announcelist/SuggestCard/SuggestCard';
import RedirectToast from '@/components/common/RedirectToast/RedirectToast';
import styles from './page.module.scss';

type HomeProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default function Home({ searchParams }: HomeProps) {
  const headerData = searchParams?.keyword as string;
  const headerDataExisted = headerData
    ? `${styles.suggestWrapper} ${styles.headerDataExisted}`
    : `${styles.suggestWrapper}`;

  return (
    <>
      <RedirectToast />
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
    </>
  );
}
