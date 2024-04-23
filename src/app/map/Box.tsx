import Image from 'next/image';
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
      <h2 style={{ paddingBottom: '3rem' }}>공고리스트</h2>

      {shop.shop_id < 0 ? (
        <div>지도에서 가게를 선택해주세요</div>
      ) : (
        <div style={{ display: 'flex', gap: '1.5rem', borderBottom: '1px solid #aaa', paddingBottom: '2rem' }}>
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
            <h3 style={{ marginBottom: '1rem' }}>{shop.shop_name}</h3>
            <p style={{ marginBottom: '1rem' }}>{shop.description}</p>
            <p style={{ marginBottom: '1rem' }}>기존시급: {shop.originalHourlyPay}</p>
            <p>
              {shop.address1} {shop.address2}
            </p>
          </div>
        </div>
      )}
      <ul style={{ paddingTop: '2rem' }}>
        {state.map((item) => (
          <li key={item.item.id}>
            <h3>{item.item.description}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
}
