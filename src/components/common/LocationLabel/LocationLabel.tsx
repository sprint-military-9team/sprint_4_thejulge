'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { GPS } from '@/utils/constants';
import ShopMap from './ShopMap';
import styles from './LocationLabel.module.scss';

type LocationProps = {
  address1: string;
  address2: string;
};

export default function LocationLabel({ address1, address2 }: LocationProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isHover, setIsHover] = useState(false);
  const [isDrag, setIsDrag] = useState(false);
  const handleClickLabel = () => {
    window.open(`https://map.kakao.com/?q=${address1}%20${address2}`);
  };

  const handleMouseLeaveMap = () => {
    if (!isDrag) {
      setIsHover(false);
    }
  };

  useEffect(() => {
    const handleMouseUP = () => {
      setIsDrag(false);
    };
    document.addEventListener('mouseup', handleMouseUP);
  }, []);

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={handleMouseLeaveMap}
      onMouseDown={() => setIsDrag(true)}
      className={styles.wrapper}
      ref={wrapperRef}
    >
      <div className={styles.labelWrapper} onClick={handleClickLabel}>
        <Image src={GPS} alt="위치" width={20} height={20} />
        <span>{address1}</span>
      </div>

      <ShopMap address1={address1} address2={address2} isHover={isHover} />
    </div>
  );
}
