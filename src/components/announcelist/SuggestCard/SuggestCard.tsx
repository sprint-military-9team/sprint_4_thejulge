'use client';

import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import Cookies from 'js-cookie';
import Card from '@/components/common/Card';
import raisePercent from '@/utils/getRaisePercent';
import { getAnnounceData, getUserProfileAddress } from '@/apis/announce';
import { CLOSELOCATIONLIST } from '@/constants/SEOUL';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './suggest.module.scss';
import { Data, MainData } from './type';
import CardListSkeleton from './skeleton/CardListSkeleton';

const SLICK_SETTINGS = {
  dots: false,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  arrows: false,
  initialSlide: 0,
  autoplaySpeed: 3000,
  speed: 500,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
      },
    },
  ],
};

export default function SuggestCard() {
  const [data, setData] = useState<Data | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const today = new Date();
  today.setHours(today.getHours() + 9);

  const suggestData = data?.items
    .filter((cardData) => !cardData.item.closed && today <= new Date(cardData.item.startsAt))
    .slice(0, 30);
  const userId = Cookies.get('userId');
  const token = Cookies.get('token');
  const type = Cookies.get('type');

  useEffect(() => {
    if (token && type === 'employee') {
      let userResidence;
      setIsLoading(true);
      const fetchUserData = async () => {
        try {
          const res = await getUserProfileAddress(userId);
          userResidence = res;
          if (userResidence) {
            const fetchData = async () => {
              const response = await getAnnounceData(0, 100, CLOSELOCATIONLIST[userResidence], null, null, null, 'pay');
              setData(response);
              setIsLoading(false);
            };
            fetchData();
          } else {
            const fetchData = async () => {
              const response = await getAnnounceData(0, 100, null, null, null, null, 'pay');
              setData(response);
              setIsLoading(false);
            };
            fetchData();
          }
        } catch (error) {
          toast.error('유저 정보를 불러오는데 실패했습니다.');
        }
      };
      fetchUserData();
    } else {
      const fetchData = async () => {
        const response = await getAnnounceData(0, 100, null, null, null, null, 'pay');
        setData(response);
        setIsLoading(false);
      };
      fetchData();
    }
  }, []);

  if (isLoading) return <CardListSkeleton title="맞춤 공고" length={3} />;

  return (
    <section className={styles.sectionWrapper}>
      <p className={styles.title}>맞춤 공고</p>
      {suggestData?.length > 3 ? (
        <Slider {...SLICK_SETTINGS} className={styles.cardWrapper}>
          {suggestData?.map((cardData: MainData) => (
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
              completed={
                cardData?.item.closed ? '모집 완료' : today > new Date(cardData?.item.startsAt) ? '지난 공고' : ''
              }
              shopId={cardData.item.shop.item.id}
              noticeId={cardData.item.id}
            />
          ))}
        </Slider>
      ) : (
        <div className={styles.alertWrapper}>
          <p>맞춤 데이터가 없습니다.</p>
        </div>
      )}
    </section>
  );
}
