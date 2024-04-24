import getTimeDifference from '@/utils/getTimeDifference';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type BoxProps = {
  shop: {
    shop_id: number;
    shop_name: string;
    address1: string;
    address2: string;
    imageUrl: string;
    description: string;
    originalHourlyPay: string;
  };
};

export default function Box({ shop }: BoxProps) {
  const [state, setState] = useState([]);
  useEffect(() => {
    if (shop.shop_id < 0) return;
    (async function () {
      const response = await fetch(
        `https://bootcamp-api.codeit.kr/api/0-1/the-julge/shops/${shop.shop_id}/notices?limit=100`,
      );
      const data = await response.json();
      setState(data.items);
    })();
  }, [shop.shop_id]);

  return (
    <div
      style={{
        position: 'absolute',
        width: '400px',
        height: '700px',
        backgroundColor: '#fff',
        zIndex: 9999,
        top: '8%',
        right: '4rem',
        padding: '3rem',
        borderRadius: '2rem',
      }}
    >
      <h2 style={{ paddingBottom: '3rem' }}>내가 선택한 가게</h2>

      {shop.shop_id < 0 ? (
        <div>지도에서 가게를 선택해주세요</div>
      ) : (
        <div style={{ display: 'flex', gap: '1.5rem', paddingBottom: '2rem' }}>
          <div
            style={{
              width: '8rem',
              height: '8rem',
              position: 'relative',
              borderRadius: '1rem',
              overflow: 'hidden',
              flexShrink: 0,
            }}
          >
            <Image fill src={shop.imageUrl} alt="af" />
          </div>
          <div>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.4rem' }}>{shop.shop_name}</h3>
            <p style={{ marginBottom: '1rem' }}>{shop.description}</p>
            <p style={{ marginBottom: '1rem' }}>기존시급: {shop.originalHourlyPay}</p>
            <p>
              {shop.address1} {shop.address2}
            </p>
          </div>
        </div>
      )}
      <h2 style={{ paddingBottom: '1rem' }}>공고 리스트 </h2>
      <div style={{ overflow: 'scroll', height: '50rem' }}>
        <ul style={{ paddingTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.6rem' }}>
          {state.map((item) => (
            <li key={item.item.id} style={{ borderBottom: '1px solid #aaa', paddingBottom: '1rem' }}>
              <div>
                <h3>{item.item.description}</h3>
                <p>시급: {item.item.hourlyPay}</p>
                <p>{item.item.description}</p>
                {/* 지난 공고는 띄워주지를 말자 */}
                <p>{getTimeDifference(item.item.startsAt, item.item.workhour)}</p>
                <p>{item.item.closed ? '마감' : ''}</p>
                <Link href="/">공고 보러가기</Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/**
  "hourlyPay": "number",
        "startsAt": "string",
        "workhour": "number",
        "description": "string",
        "closed": "boolean", 
  
 
 */
