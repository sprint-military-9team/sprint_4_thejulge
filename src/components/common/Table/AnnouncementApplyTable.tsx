'use client';

import { useState } from 'react';
import styles from './Table.module.scss';
import Pagination from '../Pagination';

const items = [
  {
    item: {
      id: '1',
      status: 'pending',
      createdAt: 'string',
      user: {
        item: {
          id: 'string',
          email: 'string',
          type: 'employee',
          name: '너구리네라면집', // optional
          phone: 'string', // optional
          address: 'string', // optional
          bio: 'string', // optional
        },
        href: 'string',
      },
      shop: {
        item: {
          id: '2',
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
          id: '3',
          hourlyPay: 'number',
          description: 'string',
          startsAt: 'string',
          workhour: 'number',
          closed: 'boolean',
        },
        href: 'string',
      },
    },
  },
  {
    item: {
      id: '4',
      status: 'pending',
      createdAt: 'string',
      user: {
        item: {
          id: 'string',
          email: 'string',
          type: 'employee',
          name: '너구리네라면집', // optional
          phone: 'string', // optional
          address: 'string', // optional
          bio: 'string', // optional
        },
        href: 'string',
      },
      shop: {
        item: {
          id: '5',
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
          id: '7',
          hourlyPay: 'number',
          description: 'string',
          startsAt: 'string',
          workhour: 'number',
          closed: 'boolean',
        },
        href: 'string',
      },
    },
  },
];

export default function UserApplyTable() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.tr}>
            <th className={`${styles.th} ${styles.firstColumn}`}>신청자</th>
            <th className={`${styles.th} ${styles.secondColumn}`}>소개</th>
            <th className={`${styles.th} ${styles.thirdColumn}`}>전화번호</th>
            <th className={`${styles.th} ${styles.forthColumn}`}>상태</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {items.map(({ item }) => (
            <tr key={item.id} className={styles.tr}>
              <td className={`${styles.td} ${styles.firstColumn}`}>{item.user.item.name}</td>
              <td className={`${styles.td} ${styles.secondColumn}`}>2023.01.12 10:00 ~ 12:00 (2시간)</td>
              <td className={`${styles.td} ${styles.thirdColumn}`}>12,500원</td>
              <td className={`${styles.td} ${styles.forthColumn}`}>대기중</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination perPageDataCount={4} allDataCount={30} currentPage={currentPage} onPageChange={setCurrentPage} />
    </div>
  );
}
