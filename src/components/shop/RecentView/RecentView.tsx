'use client';

import React from 'react';
import Card from '@/components/common/Card';
import styles from './recentview.module.scss';
import { Data } from './type';

function RecentView() {
  const recentData = JSON.parse(localStorage.getItem('cardDataList') || '[]');

  return (
    <div className={styles.recentViewWrapper}>
      <span>최근에 본 공고</span>
      <div className={styles.recentViewGrid}>
        {recentData.map((data: Data) => (
          <Card key={data.noticeId} {...data} />
        ))}
      </div>
    </div>
  );
}

export default RecentView;
