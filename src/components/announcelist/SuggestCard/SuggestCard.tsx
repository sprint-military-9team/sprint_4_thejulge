'use client';

import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import Cookies from 'js-cookie';
import Card from '@/components/common/Card';
import raisePercent from '@/utils/getRaisePercent';
import { getAnnounceData, getUserProfileAddress } from '@/apis/announce';
import { SEOULGROUPLIST, CLOSELOCATIONLIST } from '@/constants/SEOUL';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './suggest.module.scss';
import { Data, MainData } from './type';

function SuggestCard() {
  const randomIndex = Math.floor(Math.random() * SEOULGROUPLIST.length);
  const [data, setData] = useState<Data | null>(null);
  const [userResidence, setUserResidence] = useState<string>(SEOULGROUPLIST[randomIndex]);

  const today = new Date();

  const suggestData = data?.items
    .filter((cardData) => !cardData.item.closed && today <= new Date(cardData.item.startsAt))
    .slice(0, 30);
  const len = suggestData?.length;
  const settings = {
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
  const userId = Cookies.get('userId');
  const token = Cookies.get('token');
  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;
      const response = await getUserProfileAddress(userId);
      setUserResidence(response);
    };
    fetchUserData();
  }, [userId]);

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        const response = await getAnnounceData(0, 100, CLOSELOCATIONLIST[userResidence], null, null, null, 'pay');
        setData(response);
      };
      fetchData();
    } else {
      const fetchData = async () => {
        const response = await getAnnounceData(0, 100, null, null, null, null, 'pay');
        setData(response);
      };
      fetchData();
    }
  }, [userResidence]);

  return (
    <section className={styles.sectionWrapper}>
      {len >= 3 ? (
        <>
          <p className={styles.title}>맞춤 공고</p>
          <Slider {...settings} className={styles.cardWrapper}>
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
        </>
      ) : (
        <div className={styles.alertWrapper}>
          <span className={styles.title}>추천 공고가 없습니다</span>
        </div>
      )}
    </section>
  );
}
export default SuggestCard;
