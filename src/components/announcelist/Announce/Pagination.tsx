'use client';

import { ARROW_NEXT, ARROW_PREV } from '@/utils/constants';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import styles from './pagination.module.scss';

type Props = {
  currentPage: number;
  onPageChange: Dispatch<SetStateAction<number>>;
  allDataCount: number | undefined;
  perPageDataCount: number;
};

const PAGE_LIMIT = 7;

const createPageNumberList = (currentPage: number, totalPages: number): number[] => {
  const startPage = Math.max(1, Math.min(currentPage - 3, totalPages - PAGE_LIMIT + 1));
  const endPage = Math.min(startPage + PAGE_LIMIT - 1, totalPages);

  return new Array(endPage - startPage + 1).fill(0).map((_, index) => index + startPage);
};

export default function Pagination({ currentPage, onPageChange, allDataCount = 0, perPageDataCount }: Props) {
  const totalPages = Math.ceil(allDataCount / perPageDataCount);
  const pageNumberList = createPageNumberList(currentPage, totalPages);

  return (
    <div className={styles.container}>
      {totalPages > PAGE_LIMIT && (
        <button
          disabled={currentPage === 1}
          type="button"
          className={styles.button}
          onClick={() => onPageChange((page) => page - 1)}
        >
          <Image width={20} height={20} src={ARROW_PREV} alt="arrow_prev" />
        </button>
      )}
      <ul className={styles.list}>
        {pageNumberList.map(
          (item) =>
            item <= totalPages && (
              <li key={item} className={`${styles.listItem} ${currentPage === item ? styles.selected : ''}`}>
                <button className={styles.pageButton} type="button" onClick={() => onPageChange(item)}>
                  {item}
                </button>
              </li>
            ),
        )}
      </ul>

      {totalPages > PAGE_LIMIT && (
        <button
          disabled={currentPage === totalPages}
          type="button"
          className={styles.button}
          onClick={() => onPageChange((page) => page + 1)}
        >
          <Image width={20} height={20} src={ARROW_NEXT} alt="arrow_prev" />
        </button>
      )}
    </div>
  );
}
