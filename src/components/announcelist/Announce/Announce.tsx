'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Card from '@/components/common/Card';
import Filter from '@/components/announcelist/Filter';
import { ARROW_DOWN, ARROW_UP } from '@/utils/constants';
import raisePercent from '@/utils/getRaisePercent';
import getAnnounceData from '@/apis/announce';
import Pagination from './Pagination';
import styles from './announce.module.scss';
import { Data, MainData, SortButtonProps, SortListProps, FilterButtonProps, FilterInfo } from './type';

interface AnnounceProps {
  headerData: string;
}
interface SortOptions {
  [key: string]: 'time' | 'pay' | 'hour' | 'shop';
}
const sortList: SortOptions = {
  마감임박순: 'time',
  시급많은순: 'pay',
  시간적은순: 'hour',
  가나다순: 'shop',
};

function SortButton({ selected, onClick, isSortOpen }: SortButtonProps) {
  return (
    <button type="button" className={styles.sortButton} onClick={onClick}>
      {selected}
      <Image src={isSortOpen ? ARROW_UP : ARROW_DOWN} alt="arrow-down" width={10} height={10} />
    </button>
  );
}
function FilterButton({ count, onClick }: FilterButtonProps) {
  return (
    <button type="button" className={styles.filterButton} onClick={onClick}>
      {`상세 필터${count !== 0 ? ` (${count})` : ''}`}
    </button>
  );
}
function SortList({ onClick }: SortListProps) {
  return (
    <div className={styles.sortList}>
      <div onClick={() => onClick('마감임박순')} className={styles.sortItem}>
        마감임박순
      </div>
      <div onClick={() => onClick('시급많은순')} className={styles.sortItem}>
        시급많은순
      </div>
      <div onClick={() => onClick('시간적은순')} className={styles.sortItem}>
        시간적은순
      </div>
      <div onClick={() => onClick('가나다순')} className={styles.sortItem}>
        가나다순
      </div>
    </div>
  );
}

function Announce({ headerData }: AnnounceProps) {
  const [cardData, setCardData] = useState<Data>();
  const [selectedSort, setSelectedSort] = useState('마감임박순');
  const [selectedFilter, setSelectedFilter] = useState<FilterInfo | null>(null);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false); // api연동시 filter링
  const [pageNumber, setPageNumber] = useState(1);
  const countSelectedLocation =
    (selectedFilter?.location?.length ?? 0) + (selectedFilter?.startAt ? 1 : 0) + (selectedFilter?.pay ? 1 : 0);

  const handleSortButtonClick = () => {
    setIsSortOpen((prev) => !prev);
    setIsFilterOpen(false);
  };
  const handleFilterButtonClick = () => {
    setIsFilterOpen((prev) => !prev);
    setIsSortOpen(false);
  };
  const handleSortListClick = (sort: string) => {
    setSelectedSort(sort);
    setPageNumber(1);
    setIsSortOpen(false);
  };
  const handleFilterClick = (filter: FilterInfo | null) => {
    setSelectedFilter(filter);
    setPageNumber(1);
    setIsFilterOpen(false);
  };
  const removeFilter = () => {
    setIsFilterOpen(false);
  };

  const today = new Date();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAnnounceData(
        6 * (pageNumber - 1),
        6,
        selectedFilter?.location ?? null,
        headerData ?? null,
        selectedFilter?.startAt ?? null,
        selectedFilter?.pay ?? null,
        sortList[selectedSort],
      );
      setCardData(response);
    };
    fetchData();
  }, [headerData, selectedSort, selectedFilter, pageNumber]);

  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.announceWrapper}>
        <div className={styles.titleWrapper}>
          <span className={styles.title}>전체 공고</span>
          <div className={styles.filterArea}>
            <SortButton selected={selectedSort} onClick={handleSortButtonClick} isSortOpen={isSortOpen} />
            <FilterButton count={countSelectedLocation} onClick={handleFilterButtonClick} />
            {isSortOpen && <SortList onClick={handleSortListClick} />}
            {isFilterOpen && <Filter onClick={handleFilterClick} removeFilter={removeFilter} />}
          </div>
        </div>
        <div className={styles.cardWrapper}>
          {cardData?.items.map((data: MainData) => (
            <Card
              key={data?.item.id}
              image={data?.item.shop.item.imageUrl}
              title={data?.item.shop.item.name}
              startTime={data?.item.startsAt}
              workHour={data?.item.workhour}
              location={data?.item.shop.item.address1}
              salary={`${data?.item.hourlyPay}`}
              raise={data ? raisePercent(data.item.hourlyPay, data.item.shop.item.originalHourlyPay) : 0}
              isRaised={data?.item.hourlyPay > data?.item.shop.item.originalHourlyPay}
              completed={data?.item.closed ? '모집 완료' : today > new Date(data?.item.startsAt) ? '지난 공고' : ''}
              shopId={data.item.shop.item.id}
              noticeId={data.item.id}
            />
          ))}
        </div>
      </div>
      <div className={styles.paginate}>
        <Pagination
          currentPage={pageNumber}
          onPageChange={setPageNumber}
          allDataCount={cardData?.count}
          perPageDataCount={6}
        />
      </div>
    </section>
  );
}

export default Announce;
