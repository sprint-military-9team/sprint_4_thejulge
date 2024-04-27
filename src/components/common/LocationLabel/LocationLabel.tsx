'use client';

import { useState } from 'react';
import Image from 'next/image';
import { GPS } from '@/utils/constants';
import ShopMap from './ShopMap';
import styles from './LocationLabel.module.scss';

type LocationProps = {
  address1: string;
  address2: string;
};

export default function LocationLabel({ address1, address2 }: LocationProps) {
  const [isHover, setIsHover] = useState(false);
  const handleClickLabel = () => {
    window.open(`https://map.kakao.com/?q=${address1}%20${address2}`);
  };
  console.log(address1, address2);

  return (
    <div onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} className={styles.wrapper}>
      <div className={styles.labelWrapper} onClick={handleClickLabel}>
        <Image src={GPS} alt="위치" width={20} height={20} />
        <span>{address1}</span>
      </div>

      <ShopMap address1={address1} address2={address2} isHover={isHover} />
    </div>
  );
}
