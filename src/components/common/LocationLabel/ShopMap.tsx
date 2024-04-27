'use client';

import { useEffect } from 'react';
import styles from './ShopMap.module.scss';

type ShopMapProps = {
  address1: string;
  address2: string;
};
export default function ShopMap({ address1, address2 }: ShopMapProps) {
  useEffect(() => {
    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const geocoder = new window.kakao.maps.services.Geocoder();
        const container = document.getElementById('map');
        geocoder.addressSearch(`${address1} ${address2}`, (result: any, status: any) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
            const options = {
              center: coords,
              level: 3,
            };

            const map = new window.kakao.maps.Map(container, options);
            const marker = new window.kakao.maps.Marker({
              map,
              position: coords,
            });
            marker.setMap(map);
          } else {
            const coords = new window.kakao.maps.LatLng(33.450701, 126.570667);
            const options = {
              center: coords,
              level: 3,
            };
            const map = new window.kakao.maps.Map(container, options);

            const marker = new window.kakao.maps.Marker({
              map,
              position: coords,
            });
            marker.setMap(map);
          }
        });
      });
    };
    const mapScript = document.createElement('script');
    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=0d11bce1f9666f33dfb8ded92b365644&autoload=false&libraries=services`;
    document.head.appendChild(mapScript);
    mapScript.addEventListener('load', onLoadKakaoMap, { passive: true });
  }, []);
  return <div id="map" className={styles.wrapper} />;
}
