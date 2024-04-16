'use client';

import { Dispatch, SetStateAction } from 'react';
import styles from './PaginationStyles.module.scss';

type Props = {
  currentPage: number;
  onPageChange: Dispatch<SetStateAction<number>>;
  allDataCount: number;
  perPageDataCount: number;
};

const PAGE_LIMIT = 7;

const createPageNumberList = (currentPage: number, totalPages: number): number[] => {
  let startPage = 1;

  if (currentPage > 4) {
    startPage = currentPage - 3;
  }

  let endPage = startPage + PAGE_LIMIT - 1;

  if (endPage > totalPages) {
    startPage -= endPage - totalPages;
    endPage = totalPages;
    startPage = startPage < 1 ? 1 : startPage;
  }

  return new Array(endPage - startPage + 1).fill(0).map((_, i) => i + startPage);
};

export default function Pagination({ currentPage, onPageChange, allDataCount, perPageDataCount }: Props) {
  const totalPages = Math.ceil(allDataCount / perPageDataCount);
  const pageNumberList = createPageNumberList(currentPage, totalPages);

  return (
    <div className={styles.container}>
      {totalPages > PAGE_LIMIT && (
        <button disabled={currentPage === 1} type="button" onClick={() => onPageChange(currentPage - 1)}>
          {'<'}
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
        <button disabled={currentPage === totalPages} type="button" onClick={() => onPageChange(currentPage + 1)}>
          {'>'}
        </button>
      )}
    </div>
  );
}
