import getTimeDifference from '@/utils/getTimeDifference';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { PENCEL_ICON, CLOSE_ICON } from '@/utils/constants';
import Cookies from 'js-cookie';
import styles from './NoticeFeed.module.scss';

type BoxProps = {
  shop: {
    id: string;
    name: string;
    address1: string;
    address2: string;
    imageUrl: string;
    description: string;
    originalHourlyPay: number;
    category: string;
  };
  show: boolean;
  onShow: (id: boolean) => void;
};

type NoticeType = {
  item: {
    id: string;
    description: string;
    hourlyPay: string;
    startsAt: string;
    workhour: number;
    closed: boolean;
  };
};

export default function NoticeFeed({ shop, show, onShow }: BoxProps) {
  const [notice, setNotice] = useState<NoticeType[]>([]);
  const shopId = Cookies.get('shopId');
  useEffect(() => {
    if (Number(shop.id) < 0) return;
    // eslint-disable-next-line func-names
    (async function () {
      const response = await fetch(
        `https://bootcamp-api.codeit.kr/api/4-9/the-julge/shops/${shop.id}/notices?limit=100`,
      );
      const data = await response.json();
      setNotice(data.items);
    })();
  }, [shop.id]);

  if (!show) {
    return <div />;
  }

  return (
    <div className={styles.container}>
      <h2 className={`${styles.title} ${styles.shopTitle}`}>
        <span>내가 선택한 가게</span>
        <button type="button" className={styles.closeButton} onClick={() => onShow(false)}>
          <Image width={20} height={20} src={CLOSE_ICON} alt="close_icon" />
        </button>
      </h2>

      {Number(shop.id) < 0 ? (
        <div className={styles.empty}>지도에서 가게를 선택해주세요</div>
      ) : (
        <div className={styles.shop}>
          <div className={styles.cover}>
            <Image fill src={shop.imageUrl} alt="af" style={{ objectFit: 'cover' }} />
          </div>
          <div>
            <h3 className={styles.shopName}>{shop.name}</h3>
            <p className={styles.address}>
              {shop.address1} {shop.address2}
            </p>
            <p className={styles.shopDescription}>{shop.description}</p>
            <p className={styles.shopOriginalPay}>기존시급: {shop.originalHourlyPay}</p>
          </div>
        </div>
      )}
      <h2 className={`${styles.title} ${styles.noticeTitle}`}>
        <Image width={20} height={13} src={PENCEL_ICON} alt="pencil" />
        <p className={styles.shopListTitle}>공고 리스트</p>
      </h2>
      <div className={styles.shopListContainer}>
        <ul className={styles.shopList}>
          {notice.map((item) => (
            <li key={item.item.id} className={styles.shopListItem}>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                <div>
                  <h3 className={styles.itemDes}>{item.item.description}</h3>
                  <p className={styles.itemPay}>시급: {item.item.hourlyPay}</p>
                  {/* 지난 공고는 띄워주지를 말자 */}
                  <p className={styles.itemDay}>{getTimeDifference(item.item.startsAt, item.item.workhour)}</p>
                  <p className={`${styles.closed} ${!item.item.closed && styles.pending}`}>
                    {item.item.closed ? '마감' : '모집중'}
                  </p>
                </div>
                <Link
                  href={
                    shopId !== shop.id
                      ? `shop?shopId=${shop.id}&noticeId=${item.item.id}`
                      : `ownerNoticeDetail?noticeId=${item.item.id}`
                  }
                  style={{ flexShrink: 0 }}
                >
                  <button type="button" className={styles.btn}>
                    공고 보러가기
                  </button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
