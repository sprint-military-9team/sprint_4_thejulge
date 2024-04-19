import React from 'react';
import ShopDetail from '@/components/shop/ShopDetail';
import RecentView from '@/components/shop/RecentView';
import styles from './page.module.scss';

export default function Home() {
  return (
    <div>
      <div className={styles.Wrapper}>
        <ShopDetail />
      </div>
      <div className={styles.Wrapper}>
        <RecentView />
      </div>
    </div>
  );
}
