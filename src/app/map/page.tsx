'use client';

import { useEffect, useState } from 'react';
import Box from './Box';

declare global {
  interface Window {
    kakao: any;
  }
}

const restaurants = [
  {
    address: '서가앤쿡 타임스퀘어점',
    shop_id: 1,
  },
  {
    address: '서울대학교',
    shop_id: 2,
  },
  {
    address: '서울특별시 마포구 잔다리로6길 25 재륜빌딩',
    shop_id: 3,
  },
];

export default function Map() {
  const [shop, setShop] = useState({
    address: '',
    shop_id: -1,
  });

  useEffect(() => {
    const mapScript = document.createElement('script');
    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=0d11bce1f9666f33dfb8ded92b365644&autoload=false&libraries=services`;
    document.head.appendChild(mapScript);
    const container = document.getElementById('map')!;
    console.log(container);
    const onLoadKakaoMap = () => {
      console.log('aifowiejfao');
      window.kakao.maps.load(() => {
        const ps = new window.kakao.maps.services.Places();

        function addMarker(position, idx) {
          // 마커 이미지 url, 스프라이트 이미지를 씁니다
          // const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png';
          const imageSrc = 'http://localhost:3000/assets/image.png';
          // 마커 이미지의 크기
          const imageSize = new window.kakao.maps.Size(478, 397);
          const imgOptions = {
            // 스프라이트 이미지의 크기
            spriteSize: new window.kakao.maps.Size(40, 46),
            spriteOrigin: new window.kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
            offset: new window.kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
          };
          const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions);
          const marker = new window.kakao.maps.Marker({
            position, // 마커의 위치
            image: markerImage,
          });

          marker.setMap(map);

          return marker;
        }

        function displayPlaces(places, address, shop_id) {
          console.log('address:', address);
          for (let i = 0; i < places.length; i++) {
            // 마커를 생성하고 지도에 표시합니다
            const placePosition = new window.kakao.maps.LatLng(places[i].y, places[i].x);
            const marker = addMarker(placePosition, i);
            marker.address = address;
            marker.shop_id = shop_id;

            window.kakao.maps.event.addListener(marker, 'click', () => {
              setShop({ ...shop, shop_id: marker.shop_id, address: marker.address });
            });
          }
        }

        function placesSearchCB(data: string, address: string, shop_id: number) {
          displayPlaces(data, address, shop_id);
        }

        function searchPlaces() {
          // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다

          restaurants.forEach((restaurant) => {
            ps.keywordSearch(restaurant.address, (data: string) =>
              placesSearchCB(data, restaurant.address, restaurant.shop_id),
            );
          });
        }

        // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다

        console.log('kakao map 사용할 준비 완료!');

        const options = {
          center: new window.kakao.maps.LatLng(37.52361111, 126.8983417),

          level: 7,
        };

        const map = new window.kakao.maps.Map(container, options);
        map.setZoomable(false);

        searchPlaces();
      });
    };
    mapScript.addEventListener('load', onLoadKakaoMap);
  }, []);

  return (
    <div id="map" style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <Box shop_id={shop.shop_id} address={shop.address} />
    </div>
  );
}
