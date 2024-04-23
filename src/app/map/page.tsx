'use client';

import { useEffect, useState } from 'react';
import Box from './Box';
import { items } from './mockData';

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
  {
    address: '교촌치킨 신용산역점',
    shop_id: 4,
  },
  {
    address: '김정은 치킨',
    shop_id: 4,
  },
];

function extractShopInfo(items) {
  const shopInfoArray = [];

  items.forEach((item) => {
    const { shop } = item.item;
    if (shop && shop.item && shop.item.id && shop.item.name && shop.item.address1 && shop.item.address2) {
      const shopInfo = {
        shop_id: shop.item.id,
        shop_name: shop.item.name,
        address1: shop.item.address1,
        address2: shop.item.address2,
        imageUrl: shop.item.imageUrl,
        originalHourlyPay: shop.item.originalHourlyPay,
        description: shop.item.description,
      };

      shopInfoArray.push(shopInfo);
    }
  });

  return shopInfoArray;
}

const mockDatas = extractShopInfo(items);

export default function Map() {
  const [shop, setShop] = useState({
    shop_id: -1,
    shop_name: '',
    address1: '',
    address2: '',
    imageUrl: '',
  });

  useEffect(() => {
    const mapScript = document.createElement('script');
    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=0d11bce1f9666f33dfb8ded92b365644&autoload=false&libraries=services`;
    document.head.appendChild(mapScript);
    const container = document.getElementById('map')!;
    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const ps = new window.kakao.maps.services.Places();

        function addMarker(position, idx) {
          // 마커 이미지 url, 스프라이트 이미지를 씁니다
          // const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png';
          // const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png';
          const imageSrc = 'http://localhost:3000/assets/gps.svg';
          // 마커 이미지의 크기
          const imageSize = new window.kakao.maps.Size(34, 39);
          // const imgOptions = {
          // 스프라이트 이미지의 크기
          // spriteSize: new window.kakao.maps.Size(40, 46),
          // spriteOrigin: new window.kakao.maps.Point(0, idx * 16 + 10),
          // offset: new window.kakao.maps.Point(13, 37),
          // };
          const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
          const marker = new window.kakao.maps.Marker({
            position, // 마커의 위치
            image: markerImage,
          });

          marker.setMap(map);

          return marker;
        }

        function displayPlaces(places: { x: number; y: number }[], shop) {
          for (let i = 0; i < places.length; i += 1) {
            // 마커를 생성하고 지도에 표시합니다
            const placePosition = new window.kakao.maps.LatLng(places[i].y, places[i].x);
            const marker = addMarker(placePosition, i);
            marker.shop = shop;

            window.kakao.maps.event.addListener(marker, 'click', () => {
              setShop(marker.shop);
            });
          }
        }

        function placesSearchCB(data: string, shop) {
          displayPlaces(data, shop);
        }

        function searchPlaces() {
          // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다

          mockDatas.forEach((mockData) => {
            ps.keywordSearch(`${mockData.address1} ${mockData.address2}`, (data) => placesSearchCB(data, mockData));
          });
        }

        const options = {
          center: new window.kakao.maps.LatLng(37.52361111, 126.8983417),

          level: 7,
        };

        const map = new window.kakao.maps.Map(container, options);
        // map.setZoomable(false);

        searchPlaces();
      });
    };
    mapScript.addEventListener('load', onLoadKakaoMap);
  }, []);

  return (
    <div id="map" style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <Box shop={shop} />
    </div>
  );
}
