import { ARROW_NEXT, ARROW_PREV } from '@/utils/constants';
import Link from 'next/link';
import styles from './PaginationSSR.module.scss';

type Props = {
  currentPage: number;
  allDataCount: number;
  perPageDataCount: number;
  pageQuery?: string;
};

const PAGE_LIMIT = 4;

const createPageNumberList = (currentPage: number, totalPages: number): number[] => {
  const startPage = Math.max(1, Math.min(currentPage - 3, totalPages - PAGE_LIMIT + 1));
  const endPage = Math.min(startPage + PAGE_LIMIT - 1, totalPages);

  return new Array(endPage - startPage + 1).fill(0).map((_, index) => index + startPage);
};

export default function Pagination({ currentPage = 1, allDataCount, perPageDataCount, pageQuery }: Props) {
  const totalPages = Math.ceil(allDataCount / perPageDataCount);
  const pageNumberList = createPageNumberList(currentPage, totalPages);

  return (
    <div className={styles.container}>
      {totalPages > PAGE_LIMIT && (
        <Link
          href={pageQuery ? `${pageQuery}&page=${currentPage - 1}` : `?page=${currentPage - 1}`}
          className={styles.button}
          prefetch
        >
          <img src={ARROW_PREV} alt="arrow_prev" />
        </Link>
      )}
      <ul className={styles.list}>
        {pageNumberList.map(
          (item) =>
            item <= totalPages && (
              <li key={item} className={`${styles.listItem} ${currentPage === item ? styles.selected : ''}`}>
                <Link
                  href={pageQuery ? `${pageQuery}&page=${item}` : `?page=${item}`}
                  className={styles.pageButton}
                  prefetch
                >
                  {item}
                </Link>
              </li>
            ),
        )}
      </ul>

      {totalPages > PAGE_LIMIT && (
        <Link
          href={pageQuery ? `${pageQuery}&page=${currentPage + 1}` : `?page=${currentPage + 1}`}
          className={styles.button}
          prefetch
        >
          <img src={ARROW_NEXT} alt="arrow_prev" />
        </Link>
      )}
    </div>
  );
}
