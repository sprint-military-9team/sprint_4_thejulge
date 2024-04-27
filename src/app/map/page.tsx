'use client';

import { useEffect, useState } from 'react';
import { Item, ShopInfo } from '@/types/shopDetailPageType';
import NoticeFeed from './NoticeFeed';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

interface Items {
  item: Item;
}

function extractShopInfo(items: Items[]) {
  const shopInfoArray: ShopInfo[] = [];
  const shopNameList: string[] = [];
  items.forEach((item) => {
    const { shop } = item.item;
    console.log('check: ', shop.item.name === '행복한유부');
    if (
      shop &&
      shop.item &&
      shop.item.id &&
      shop.item.name &&
      shop.item.address1 &&
      shop.item.address2 &&
      shop.item.category &&
      !shopNameList.includes(shop.item.name)
    ) {
      const shopInfo = {
        id: shop.item.id,
        name: shop.item.name,
        category: shop.item.category,
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

const INITIAL_LATLNG = {
  lat: 37.52361111,
  lng: 126.9883517,
  level: 7,
};

export default function Map() {
  const [shop, setShop] = useState({
    id: '-1',
    name: '',
    category: '',
    address1: '',
    address2: '',
    imageUrl: '',
    originalHourlyPay: -1,
    description: '',
  } as ShopInfo);

  useEffect(() => {
    if (!localStorage.getItem('shop')) return;
    setShop(JSON.parse(localStorage.getItem('shop')));
  }, []);

  useEffect(() => {
    const mapScript = document.createElement('script');
    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=0d11bce1f9666f33dfb8ded92b365644&autoload=false&libraries=services`;
    document.head.appendChild(mapScript);
    const container = document.getElementById('map')!;
    const onLoadKakaoMap = () => {
      // window.kakao.maps.event.addEventListener(map);
      window.kakao.maps.load(() => {
        const lastLocation = localStorage.getItem('LAST_LOCATION')
          ? JSON.parse(localStorage.getItem('LAST_LOCATION'))
          : INITIAL_LATLNG;

        const options = {
          center: new window.kakao.maps.LatLng(lastLocation.lat, lastLocation.lng),

          level: lastLocation.level,
        };

        const map = new window.kakao.maps.Map(container, options);

        window.kakao.maps.event.addListener(map, 'dragend', () => {
          const latlng = map.getCenter();
          const level = map.getLevel();

          localStorage.setItem('LAST_LOCATION', JSON.stringify({ lat: latlng.getLat(), lng: latlng.getLng(), level }));
        });

        window.kakao.maps.event.addListener(map, 'zoom_changed', () => {
          const level = map.getLevel();
          const latlng = map.getCenter();

          localStorage.setItem('LAST_LOCATION', JSON.stringify({ lat: latlng.getLat(), lng: latlng.getLng(), level }));
        });

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
              localStorage.setItem('shop', JSON.stringify(marker.shop));
            });
          }
        }

        function placesSearchCB(data: { x: number; y: number }[], shopData: ShopInfo) {
          displayPlaces(data, shopData);
        }

        function searchPlaces() {
          const geocoder = new window.kakao.maps.services.Geocoder();
          // mockDatas
          // eslint-disable-next-line func-names
          (async function () {
            const response = await fetch(
              'https://bootcamp-api.codeit.kr/api/0-1/the-julge/notices?limit=100&sort=time',
            );
            const resData = await response.json();
            const datas = extractShopInfo(resData.items);
            datas?.forEach((shopData) => {
              geocoder.addressSearch(`${shopData.address1} ${shopData.address2}`, (data: { x: number; y: number }[]) =>
                placesSearchCB(data, shopData),
              );
            });
          })();
        }

        searchPlaces();
      });
    };
    mapScript.addEventListener('load', onLoadKakaoMap);
  }, []);

  return (
    <div id="map" style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <NoticeFeed shop={shop} />
    </div>
  );
}
