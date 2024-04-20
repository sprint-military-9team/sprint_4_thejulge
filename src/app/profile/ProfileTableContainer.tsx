'use client';

import Pagination from '@/components/common/Pagination';
import { useCallback, useEffect, useState } from 'react';
import { useAsync } from '@/hooks/useAsync';
import { getUserApplicationData } from '@/apis/application';
import Table from '@/components/common/Table';
import getTimeDifference from '@/utils/getTimeDifference';
import styles from './ProfileTableContainer.module.scss';
import Banner from './Banner';

const USER_ID = '4896c2a6-3c24-4f26-9f5d-84c4b13db4fd'; // user1
const LIMIT = 4;

type HeaderType = {
  id: 'name' | 'day' | 'hourlyPay' | 'status';
  name: string;
};

type BodyType = {
  id: string;
  name: string;
  day: string;
  hourlyPay: number;
  status: 'pending' | 'rejected' | 'accepted' | 'canceled';
};

type TableData = {
  header: HeaderType[];
  body: BodyType[];
};

export default function ProfileTableContainer() {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, error, getUserApplicationDataAsync] = useAsync(getUserApplicationData);
  const [count, setCount] = useState(0);
  const [tableData, setTableData] = useState<TableData>({
    header: [
      { id: 'name', name: '가게' },
      { id: 'day', name: '일자' },
      { id: 'hourlyPay', name: '시급' },
      { id: 'status', name: '상태' },
    ],
    body: [],
  });

  const handleLoadUserApplicationData = useCallback(async (user_id: string) => {
    const data = await getUserApplicationDataAsync(user_id, 7, 7 * (currentPage - 1));
    if (!data) return;
    const body = data.items.map((application) => {
      const {
        item: {
          id,
          status,
          shop: {
            item: { name },
          },
          notice: {
            item: { hourlyPay, startsAt, workhour },
          },
        },
      } = application;
      return { id, name, day: getTimeDifference(startsAt, Number(workhour)), hourlyPay, status };
    });
    setTableData((previousData) => ({ ...previousData, body }));
    setCount(data.count);
  }, []);

  useEffect(() => {
    handleLoadUserApplicationData(USER_ID);
  }, [handleLoadUserApplicationData]);

  if (loading) {
    return (
      <div>
        <div className={styles.applyList}>
          <div className={styles.wrapper}>loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {count > 0 ? (
        <section className={styles.applyList}>
          <div className={styles.wrapper}>
            <h2 className={styles.sectionTitle}>신청 내역</h2>
            <div className={styles.tableContainer}>
              <Table header={tableData.header} body={tableData.body} type="worker" />
              <Pagination
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                allDataCount={count}
                perPageDataCount={LIMIT}
              />
            </div>
          </div>
        </section>
      ) : (
        <section className={styles.applyList}>
          <div className={styles.wrapper}>
            <h2 className={styles.sectionTitle}>신청 내역</h2>
            <Banner description="아직 신청 내역이 없어요." buttonContent="공고 보러가기" linkPath="/" />
          </div>
        </section>
      )}
    </div>
  );
}
