'use client';

import { useState } from 'react';
import styles from './Table.module.scss';
import Pagination from '../Pagination';

const items = [
  {
    item: {
      id: 'string',
      status: 'pending',
      createdAt: 'string',
      shop: {
        item: {
          id: 'string',
          name: 'string',
          category: 'string',
          address1: 'string',
          address2: 'string',
          description: 'string',
          imageUrl: 'string',
          originalHourlyPay: 'number',
        },
        href: 'string',
      },
      notice: {
        item: {
          id: 'string',
          hourlyPay: 'number',
          description: 'string',
          startsAt: 'string',
          workhour: 'number',
          closed: 'boolean',
        },
      },
    },
  },
];

export default function AnnouncementApplyTable() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.tr}>
            <th className={`${styles.th} ${styles.firstColumn}`}>가게</th>
            <th className={`${styles.th} ${styles.secondColumn}`}>일자</th>
            <th className={`${styles.th} ${styles.thirdColumn}`}>시급</th>
            <th className={`${styles.th} ${styles.forthColumn}`}>상태</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {items.map(({ item }) => (
            <tr key={item.id} className={styles.tr}>
              <td className={styles.td}>{item.shop.item.name}</td>
              <td className={styles.td}>2023.01.12 10:00 ~ 12:00 (2시간)</td>
              <td className={styles.td}>{item.notice.item.hourlyPay}</td>
              <td className={styles.td}>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination perPageDataCount={4} allDataCount={30} currentPage={currentPage} onPageChange={setCurrentPage} />
    </div>
  );
}
