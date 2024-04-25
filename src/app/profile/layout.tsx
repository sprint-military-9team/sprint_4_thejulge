import Header from '@/components/common/Header/Header';
import Footer from '@/components/common/Footer/Footer';
import { ReactNode } from 'react';

const notificationList = [
  { id: 'aef', name: 'asf', startsAt: 'awef', createdAt: 'awef', workhour: 2, result: 'af', read: false },
];

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header notificationListData={notificationList} />

      {children}
      <Footer />
    </>
  );
}
