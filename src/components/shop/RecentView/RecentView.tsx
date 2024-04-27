'use client';

import React, { useState, useEffect } from 'react';
import Card from '@/components/common/Card';
import styles from './recentview.module.scss';
import { Data } from './type';

function RecentView() {
  const [recentData, setRecentData] = useState<Data[]>([]);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('cardDataList') || '[]');
    setRecentData(data);
  }, []);

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
