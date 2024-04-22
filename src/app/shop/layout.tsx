import React from 'react';
import Header from '@/components/common/Header/Header';
import Footer from '@/components/common/Footer/Footer';
import styles from './page.module.scss';

const HEADER_DATA = [
  {
    id: '1',
    name: 'test1',
    startsAt: '2024-04-16T15:00:00.000Z',
    createdAt: '2024-04-15T15:06:15.633Z',
    workhour: 3,
    result: 'accepted',
    read: false,
  },
  {
    id: '2',
    name: 'test2',
    startsAt: '2024-04-16T15:00:00.000Z',
    createdAt: '2024-04-12T15:06:15.633Z',
    workhour: 6,
    result: 'rejected',
    read: false,
  },
  {
    id: '3',
    name: 'test3',
    startsAt: '2024-04-16T15:00:00.000Z',
    createdAt: '2024-03-19T15:06:15.633Z',
    workhour: 12,
    result: 'rejected',
    read: false,
  },
  {
    id: '4',
    name: 'test4',
    startsAt: '2024-04-16T15:00:00.000Z',
    createdAt: '2023-03-15T15:06:15.633Z',
    workhour: 4,
    result: 'rejected',
    read: false,
  },
  {
    id: '5',
    name: 'test5',
    startsAt: '2024-04-16T15:00:00.000Z',
    createdAt: '2024-04-16T15:06:15.633Z',
    workhour: 4,
    result: 'rejected',
    read: false,
  },
];

interface AnnounceListLayoutProps {
  children: React.ReactNode;
}

function AnnounceListLayout({ children }: AnnounceListLayoutProps) {
  return (
    <div className={styles.layout}>
      <Header memberType="worker" notificationListData={HEADER_DATA} />
      {children}
      <Footer />
    </div>
  );
}

export default AnnounceListLayout;
