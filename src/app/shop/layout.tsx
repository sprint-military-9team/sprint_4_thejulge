import React from 'react';
import Header from '@/components/common/Header/Header';
import Footer from '@/components/common/Footer/Footer';
import styles from './page.module.scss';

interface AnnounceListLayoutProps {
  children: React.ReactNode;
}

function AnnounceListLayout({ children }: AnnounceListLayoutProps) {
  return (
    <div className={styles.layout}>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default AnnounceListLayout;
