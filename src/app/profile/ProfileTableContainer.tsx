'use client';

import Pagination from '@/components/common/Pagination';
// import Table from '@/components/common/Table';
import { useState } from 'react';
import styles from './ProfileTableContainer.module.scss';

export default function ProfileTableContainer() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className={styles.tableContainer}>
      {/* <Table /> */}
      <Pagination currentPage={currentPage} onPageChange={setCurrentPage} allDataCount={40} perPageDataCount={LIMIT} />
    </div>
  );
}
