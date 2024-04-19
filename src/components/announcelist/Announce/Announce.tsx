'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Card from '@/components/common/Card';
import Filter from '@/components/announcelist/Filter';
import Pagination from '@/components/common/Pagination';
import { ARROW_DOWN, ARROW_UP } from '@/utils/constants';
import raisePercent from '@/utils/getRaisePercent';
import styles from './announce.module.scss';
import { Data, MainData, SortButtonProps, SortListProps, FilterButtonProps, FilterInfo } from './type';

// 'https://bootcamp-api.codeit.kr/api/0-1/the-julge/notices?offset=0'

interface AnnounceProps {
  data: Data;
}

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
      {`상세 필터${count ? ` (${count})` : ''}`}
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

function Announce({ data }: AnnounceProps) {
  // const [cardData, setCardData] = useState<Data>(data);
  const [selectedSort, setSelectedSort] = useState('마감임박순');
  const [selectedFilter, setSelectedFilter] = useState<FilterInfo | null>(null);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false); // api연동시 filter링
  const countSelectedLocation = selectedFilter?.location.length;

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
    setIsSortOpen(false);
  };
  const handleFilterClick = (filter: FilterInfo | null) => {
    setSelectedFilter(filter);
    setIsFilterOpen(false);
  };
  const removeFilter = () => {
    setIsFilterOpen(false);
  };

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
          {data.items.map((cardData: MainData) => (
            <Card
              key={cardData?.item.id}
              image={cardData?.item.shop.item.imageUrl}
              title={cardData?.item.shop.item.name}
              startTime={cardData?.item.startsAt}
              workHour={cardData?.item.workhour}
              location={cardData?.item.shop.item.address1}
              salary={`${cardData?.item.hourlyPay}`}
              raise={cardData ? raisePercent(cardData.item.hourlyPay, cardData.item.shop.item.originalHourlyPay) : 0}
              isRaised={cardData?.item.hourlyPay > cardData?.item.shop.item.originalHourlyPay}
              completed={cardData?.item.closed ? '모집 완료' : ''}
              shopId={cardData.item.shop.item.id}
              noticeId={cardData.item.id}
            />
          ))}
        </div>
      </div>
      <div className={styles.paginate}>
        <Pagination currentPage={1} onPageChange={() => {}} allDataCount={data?.count} perPageDataCount={6} />
      </div>
    </section>
  );
}

export default Announce;
