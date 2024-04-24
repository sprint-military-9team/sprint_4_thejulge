'use client';

import { useEffect, useState } from 'react';
import Box from './Box';
import { items as mockItems } from './mockData';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

type Item = {
  item: {
    id: string;
    hourlyPay: number;
    startsAt: string;
    workhour: number;
    description: string;
    closed: boolean;
    shop: {
      item: {
        id: string;
        name: string;
        category: string;
        address1: string;
        address2: string;
        description: string;
        imageUrl: string;
        originalHourlyPay: number;
      };
      href: string;
    };
  };
  links: { rel: string; description: string; method: string; href: string }[];
};

type ShopInfo = {
  shop_id: string;
  shop_name: string;
  address1: string;
  address2: string;
  imageUrl: string;
  originalHourlyPay: number;
  description: string;
};

function extractShopInfo(items: Item[]) {
  const shopInfoArray: ShopInfo[] = [];
  const shopNameList: string[] = [];
  items.forEach((item) => {
    const { shop } = item.item;
    if (
      shop &&
      shop.item &&
      shop.item.id &&
      shop.item.name &&
      shop.item.address1 &&
      shop.item.address2 &&
      !shopNameList.includes(shop.item.name)
    ) {
      const shopInfo = {
        shop_id: shop.item.id,
        shop_name: shop.item.name,
        address1: shop.item.address1,
        address2: shop.item.address2,
        imageUrl: shop.item.imageUrl,
        originalHourlyPay: shop.item.originalHourlyPay,
        description: shop.item.description,
      };

      shopNameList.push(shop.item.name);
      shopInfoArray.push(shopInfo);
    }
  });
  return shopInfoArray;
}

const mockDatas = extractShopInfo(mockItems);

export default function Map() {
  const [shop, setShop] = useState({
    shop_id: -1,
    shop_name: '',
    address1: '',
    address2: '',
    imageUrl: '',
    description: '',
    originalHourlyPay: '',
  });

  useEffect(() => {
    const mapScript = document.createElement('script');
    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=0d11bce1f9666f33dfb8ded92b365644&autoload=false&libraries=services`;
    document.head.appendChild(mapScript);
    const container = document.getElementById('map')!;
    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        function addMarker(position: any) {
          const imageSrc = 'http://localhost:3000/assets/gps.svg';
          const imageSize = new window.kakao.maps.Size(34, 39);
          const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
          const marker = new window.kakao.maps.Marker({
            position, // 마커의 위치
            image: markerImage,
          });

          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          marker.setMap(map);

          return marker;
        }

        function displayPlaces(places: { x: number; y: number }[], shopData: ShopInfo) {
          for (let i = 0; i < places.length; i += 1) {
            const placePosition = new window.kakao.maps.LatLng(places[i].y, places[i].x);
            const marker = addMarker(placePosition);
            marker.shop = shopData;

            window.kakao.maps.event.addListener(marker, 'click', () => {
              setShop(marker.shop);
            });
          }
        }

        function placesSearchCB(data: { x: number; y: number }[], shopData: ShopInfo) {
          displayPlaces(data, shopData);
        }

        function searchPlaces() {
          const geocoder = new window.kakao.maps.services.Geocoder();

          mockDatas.forEach((mockData) => {
            geocoder.addressSearch(`${mockData.address1} ${mockData.address2}`, (data: { x: number; y: number }[]) =>
              placesSearchCB(data, mockData),
            );
          });
        }

        const options = {
          center: new window.kakao.maps.LatLng(37.52361111, 126.8983417),

          level: 7,
        };

        const map = new window.kakao.maps.Map(container, options);

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
