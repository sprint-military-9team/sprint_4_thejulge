'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

export default function Map() {
  useEffect(() => {
    const mapScript = document.createElement('script');
    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=0d11bce1f9666f33dfb8ded92b365644&autoload=false`;
    document.head.appendChild(mapScript);
    const container = document.getElementById('map')!;
    console.log(container);
    const onLoadKakaoMap = () => {
      console.log('aifowiejfao');
      window.kakao.maps.load(() => {
        console.log('kakao map 사용할 준비 완료!');

        const options = {
          center: new window.kakao.maps.LatLng(37.52361111, 126.8983417),
          level: 7,
        };

        const map = new window.kakao.maps.Map(container, options);
      });
    };
    mapScript.addEventListener('load', onLoadKakaoMap);
  }, []);

  //   <Script
  //     type="text/javascript"
  //     src="//dapi.kakao.com/v2/maps/sdk.js?appkey=0d11bce1f9666f33dfb8ded92b365644&autoload=false&libraries=services"
  //   />;

  return <div id="map" style={{ width: '100%', height: '100vh' }} />;
}
