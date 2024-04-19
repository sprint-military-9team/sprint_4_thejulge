'use client';

import React, { useState } from 'react';
// import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

import raisePercent from '@/utils/getRaisePercent';
import getWorkTime from '@/utils/getWorkTime';
import { CLOCK, GPS, CARDARROW } from '@/utils/constants';
import Button from '@/components/common/Button/';
import RejectionModal from '@/components/common/Modal/RejectionModal/RejectionModal';
import styles from './shopdetail.module.scss';
import { MainData } from './type';

const mockData = {
  item: {
    id: '99996477-82db-4bda-aae1-4044f11d9a8b',
    hourlyPay: 30000,
    startsAt: '2024-07-07T18:00:00.000Z',
    workhour: 2,
    description:
      '도와주세요 안녕하세요 ㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅋㅋㅋㅋㅋㅋㅋzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz',
    closed: false,
    shop: {
      item: {
        id: '4490151c-5217-4157-b072-9c37b05bed47',
        name: '진주회관',
        category: '한식',
        address1: '서울시 중구',
        address2: '세종대로11길 26',
        description: '콩국수 맛집 인정따리 gdgdgdgdgdgddsfewssdffsewssdsdfseawseweafesaese',
        imageUrl:
          'https://bootcamp-project-api.s3.ap-northeast-2.amazonaws.com/0-1/the-julge/1bdb43c8-ff08-4a46-81b0-7f91efced98c-jinju4.png',
        originalHourlyPay: 10000,
      },
      href: '/api/0-1/the-julge/shops/4490151c-5217-4157-b072-9c37b05bed47',
    },
    currentUserApplication: null,
  },
  links: [
    {
      rel: 'self',
      description: '공고 정보',
      method: 'GET',
      href: '/api/0-1/the-julge/shops/4490151c-5217-4157-b072-9c37b05bed47/notices/99996477-82db-4bda-aae1-4044f11d9a8b',
    },
    {
      rel: 'update',
      description: '공고 수정',
      method: 'PUT',
      href: '/api/0-1/the-julge/shops/4490151c-5217-4157-b072-9c37b05bed47/notices/99996477-82db-4bda-aae1-4044f11d9a8b',
      body: {
        hourlyPay: 'number',
        startsAt: 'string',
        workhour: 'string',
        description: 'string',
      },
    },
    {
      rel: 'applications',
      description: '지원 목록',
      method: 'GET',
      href: '/api/0-1/the-julge/shops/4490151c-5217-4157-b072-9c37b05bed47/notices/99996477-82db-4bda-aae1-4044f11d9a8b/applications',
      query: {
        offset: 'undefined | number',
        limit: 'undefined | number',
      },
    },
    {
      rel: 'create',
      description: '지원하기',
      method: 'POST',
      href: '/api/0-1/the-julge/shops/4490151c-5217-4157-b072-9c37b05bed47/notices/99996477-82db-4bda-aae1-4044f11d9a8b/applications',
    },
    {
      rel: 'shop',
      description: '가게 정보',
      method: 'GET',
      href: '/api/0-1/the-julge/shops/4490151c-5217-4157-b072-9c37b05bed47',
    },
    {
      rel: 'list',
      description: '공고 목록',
      method: 'GET',
      href: '/api/0-1/the-julge/shops/4490151c-5217-4157-b072-9c37b05bed47/notices',
      query: {
        offset: 'undefined | number',
        limit: 'undefined | number',
      },
    },
  ],
};

interface CompletedMessageProps {
  completed: string;
}

function CompletedMessage({ completed }: CompletedMessageProps) {
  return (
    <div className={styles.completeWrapper}>
      <span className={styles.complete}>{completed}</span>
    </div>
  );
}

function ShopDetail() {
  const [noticeData, setNoticeData] = useState<MainData>(mockData);
  const [isApplied, setIsApplied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  //   const params = useSearchParams();
  //   const shopId = params.get('shopId');
  //   const noticeId = params.get('noticeId');
  const raise = raisePercent(noticeData?.item.shop.item.originalHourlyPay, noticeData?.item.hourlyPay);
  const workTime = getWorkTime(noticeData?.item.startsAt, noticeData?.item.workhour);
  const today = new Date();
  const completed = noticeData?.item.closed
    ? '마감 완료'
    : today > new Date(noticeData?.item.startsAt)
      ? '지난 공고'
      : '';
  const handleClickButton = () => {
    setIsApplied((prev) => !prev);
  };
  const handleOpenModal = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsModalOpen(true);
  };

  const handleButtonCancelClick = () => {
    setIsModalOpen(false);
    setIsApplied(false); // api 신청상태 변경
  };
  const handleButtonNoClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsModalOpen(false);
    setIsApplied(true);
  };

  return (
    <div className={styles.shopDetail}>
      <div className={styles.titleWrapper}>
        <span className={styles.title}>식당</span>
        <p className={styles.shopTitle}>{noticeData?.item.shop.item.name}</p>
      </div>
      <div className={styles.notice}>
        <div className={styles.shopImageWrapper}>
          <Image width={548} height={308} src={noticeData.item.shop.item.imageUrl} alt="shopImage" />
          {completed && <CompletedMessage completed={completed} />}
        </div>
        <div className={styles.noticeContent}>
          <div className={styles.noticeInfo}>
            <div className={styles.noticeInfoTitle}>
              <span className={styles.title}>시급</span>
              <div className={styles.noticeInfoSalary}>
                <span className={styles.shopTitle}>{noticeData?.item.hourlyPay}</span>
                <div className={styles.raise}>
                  <span>기존 시급보다 {raise}%</span>
                  <Image src={CARDARROW} alt="arrow" width={20} height={20} />
                </div>
              </div>
            </div>
            <div className={styles.noticeInfoTimeLoc}>
              <Image src={CLOCK} alt="clock" width={20} height={20} />
              <span>{workTime}</span>
            </div>
            <div className={styles.noticeInfoTimeLoc}>
              <Image src={GPS} alt="gps" width={20} height={20} />
              <span>{noticeData?.item.shop.item.address1}</span>
            </div>
            <span className={styles.noticeInfoDescription}>{noticeData?.item.shop.item.description}</span>
            {completed ? (
              <Button color="disabled" size="large">
                신청 불가
              </Button>
            ) : (
              <div onClick={handleClickButton}>
                {isApplied ? (
                  <div onClick={handleOpenModal}>
                    <Button color="white" size="large">
                      취소 하기
                    </Button>
                    {isModalOpen && (
                      <RejectionModal
                        isModal={isModalOpen}
                        cancelClick={handleButtonCancelClick}
                        noClick={handleButtonNoClick}
                      />
                    )}
                  </div>
                ) : (
                  <Button color="orange" size="large">
                    신청 하기
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.shopDescription}>
        <p className={styles.titleDescription}>공고 설명</p>
        <p className={styles.description}>{noticeData.item.description}</p>
      </div>
    </div>
  );
}

export default ShopDetail;
