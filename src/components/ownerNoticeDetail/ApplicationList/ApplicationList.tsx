'use client';

import Table from '@/components/common/Table';
import Pagination from '@/components/common/Pagination';
import { useEffect, useState } from 'react';
import { getSpecifyNoticeApplicationData } from '@/apis/application';
import styles from './ApplicationList.module.scss';

type ApplicationListProps = {
  shopId: string;
  noticeId: string;
};

type TableDataType = {
  titles: string[];
  data: (string | undefined)[][];
};

export default function ApplicationList({ shopId, noticeId }: ApplicationListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [TableData, setTableData] = useState<TableDataType>({
    titles: ['신청자', '소개', '전화번호', '상태'],
    data: [],
  });

  /* const TableData = {
    titles: ['신청자', '소개', '전화번호', '상태'],
    data: [
      ['0652132', '김태진', '안녕하세요', '010-3727-4228', 'pending'],
      ['151522', '김우기', '안녕하세요1', '010-4987-4228', 'pending2'],
    ],
  }; */
  useEffect(() => {
    const getApplicationData = async (shopID: string, noticeID: string) => {
      const applicationData = await getSpecifyNoticeApplicationData(shopID, noticeID);
      const data = applicationData.map((application) => {
        const {
          item: {
            id,
            status,
            user: {
              item: { name, phone, bio },
            },
          },
        } = application;
        return [id, name, bio, phone, status];
      });
      setTableData({ titles: ['신청자', '소개', '전화번호', '상태'], data });
    };
    getApplicationData(shopId, noticeId);
  }, [noticeId, shopId]);
  return (
    <div className={styles.section}>
      <div className={styles.wrapper}>
        <div className={styles.title}>신청자 목록</div>
        <div>
          <Table datas={TableData} />
          <Pagination
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            allDataCount={TableData.data.length}
            perPageDataCount={7}
          />
        </div>
      </div>
    </div>
  );
}
