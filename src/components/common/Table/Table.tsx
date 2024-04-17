'use client';

import { useState } from 'react';
import styles from './Table.module.scss';
import Pagination from '../Pagination';

/*
datas = {
  titles: ['신청자', '소개', '전화번호', '상태'],
  data: [
    ['awef', '김태진', '안녕하세요', '010-3727-4228', 'pending'],
    ['eioe', '김우기', '안녕하세요', '010-4987-4228', 'pending'],
  ],
};
*/

type Datas = {
  titles: string[];
  data: string[][];
};

type TableProps = {
  datas: Datas;
};

export default function Table({ datas }: TableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.tr}>
            {datas.titles.map((title, index) => (
              <th
                key={title}
                className={`${styles.th} ${index === 0 || index === datas.titles.length - 1 ? styles.edges : styles.middles}`}
              >
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {datas.data.map((item) => (
            <tr key={item[0]} className={styles.tr}>
              {datas.titles.map((title, index) => (
                <td
                  key={title}
                  className={`${styles.td} ${index === 0 || index === datas.titles.length - 1 ? styles.edges : styles.middles}`}
                >
                  {item[index + 1]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination perPageDataCount={5} allDataCount={30} currentPage={currentPage} onPageChange={setCurrentPage} />
    </div>
  );
}
