'use client';

import React from 'react';
import Slider from 'react-slick';
import Card from '@/components/common/Card';
import raisePercent from '@/utils/getRaisePercent';
import { CLOSELOCATIONLIST } from '@/constants/SEOUL';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './suggest.module.scss';
import { Data, MainData } from './type';

interface SuggestCardProps {
  data: Data;
  residence: string;
}

function SuggestCard({ data, residence }: SuggestCardProps) {
  const suggestData = data?.items.filter((cardData) =>
    CLOSELOCATIONLIST[residence].includes(cardData.item.shop.item.address1),
  );

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 4000,
    initialSlide: 0,
    focusOnSelect: true,
  };
  return (
    <section className={styles.sectionWrapper}>
      <p className={styles.title}>맞춤 공고</p>
      <Slider {...settings} className={styles.cardWrapper}>
        {suggestData.map((cardData: MainData) => (
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
      </Slider>
    </section>
  );
}
export default SuggestCard;
