import React from 'react';
import Announce from '@/components/announcelist/Announce/Announce';
import SuggestCard from '@/components/announcelist/SuggestCard/SuggestCard';
import styles from './page.module.scss';

const mockData = {
  offset: 0,
  limit: 6,
  address: [],
  count: 6,
  hasNext: false,
  items: [
    {
      item: {
        id: '99996477-82db-4bda-aae1-4044f11d9a8b',
        hourlyPay: 30000,
        startsAt: '2024-07-07T18:00:00.000Z',
        workhour: 2,
        description: '도와주세요',
        closed: false,
        shop: {
          item: {
            id: '4490151c-5217-4157-b072-9c37b05bed47',
            name: '진주회관',
            category: '한식',
            address1: '서울시 서초구',
            address2: '세종대로11길 26',
            description: '콩국수 맛집 인정따리',
            imageUrl:
              'https://bootcamp-project-api.s3.ap-northeast-2.amazonaws.com/0-1/the-julge/1bdb43c8-ff08-4a46-81b0-7f91efced98c-jinju4.png',
            originalHourlyPay: 10000,
          },
          href: '/api/0-1/the-julge/shops/4490151c-5217-4157-b072-9c37b05bed47',
        },
      },
      links: [
        {
          rel: 'self',
          description: '공고 정보',
          method: 'GET',
          href: '/api/0-1/the-julge/shops/4490151c-5217-4157-b072-9c37b05bed47/notices/99996477-82db-4bda-aae1-4044f11d9a8b',
        },
        {
          rel: 'shop',
          description: '가게 정보',
          method: 'GET',
          href: '/api/0-1/the-julge/shops/4490151c-5217-4157-b072-9c37b05bed47',
        },
      ],
    },
    {
      item: {
        id: '2ad3ac93-0054-442e-a882-d6cce8c10470',
        hourlyPay: 1234456,
        startsAt: '2024-07-19T15:00:00.000Z',
        workhour: 12,
        description: 'ㅈㄷㄱㅁㄴㅅㅇ',
        closed: false,
        shop: {
          item: {
            id: '63fcc375-5d0a-4ba4-ac5b-101b03973c74',
            name: '에바네 한식❤️',
            category: '한식',
            address1: '서울시 중구',
            address2: '왜..',
            description: '제발좀 하자하자하자하',
            imageUrl:
              'https://bootcamp-project-api.s3.ap-northeast-2.amazonaws.com/0-1/the-julge/1970eebc-dfaf-4fea-8b86-071c28c3b78d-%EC%9D%B4%EB%AA%A8%EC%A7%80.png',
            originalHourlyPay: 10000,
          },
          href: '/api/0-1/the-julge/shops/63fcc375-5d0a-4ba4-ac5b-101b03973c74',
        },
      },
      links: [
        {
          rel: 'self',
          description: '공고 정보',
          method: 'GET',
          href: '/api/0-1/the-julge/shops/63fcc375-5d0a-4ba4-ac5b-101b03973c74/notices/2ad3ac93-0054-442e-a882-d6cce8c10470',
        },
        {
          rel: 'shop',
          description: '가게 정보',
          method: 'GET',
          href: '/api/0-1/the-julge/shops/63fcc375-5d0a-4ba4-ac5b-101b03973c74',
        },
      ],
    },
    {
      item: {
        id: '4c7bdc76-2912-41e8-82d3-dc973e254d9b',
        hourlyPay: 10000,
        startsAt: '2024-07-19T15:00:00.000Z',
        workhour: 3,
        description: 'ㅋ',
        closed: false,
        shop: {
          item: {
            id: '63fcc375-5d0a-4ba4-ac5b-101b03973c74',
            name: '에바네 한식❤️',
            category: '한식',
            address1: '서울시 중구',
            address2: '왜..',
            description: '제발좀 하자하자하자하',
            imageUrl:
              'https://bootcamp-project-api.s3.ap-northeast-2.amazonaws.com/0-1/the-julge/1970eebc-dfaf-4fea-8b86-071c28c3b78d-%EC%9D%B4%EB%AA%A8%EC%A7%80.png',
            originalHourlyPay: 10000,
          },
          href: '/api/0-1/the-julge/shops/63fcc375-5d0a-4ba4-ac5b-101b03973c74',
        },
      },
      links: [
        {
          rel: 'self',
          description: '공고 정보',
          method: 'GET',
          href: '/api/0-1/the-julge/shops/63fcc375-5d0a-4ba4-ac5b-101b03973c74/notices/4c7bdc76-2912-41e8-82d3-dc973e254d9b',
        },
        {
          rel: 'shop',
          description: '가게 정보',
          method: 'GET',
          href: '/api/0-1/the-julge/shops/63fcc375-5d0a-4ba4-ac5b-101b03973c74',
        },
      ],
    },
    {
      item: {
        id: 'c67c8096-c0fb-4d9d-9c8f-0618d02c5a52',
        hourlyPay: 300000,
        startsAt: '2024-07-20T15:00:00.000Z',
        workhour: 3,
        description: 'ㅇㅁㄴㅇㅁㄴㅇㅁ',
        closed: false,
        shop: {
          item: {
            id: '1ca5bd34-2cc0-4ae3-b94e-c461d2e3e6f9',
            name: '우리 맛있어요!!',
            category: '중식',
            address1: '서울시 서초구',
            address2: '예예빌라',
            description: '저희 진짜 맛있어요. ㅎㅎ!!!',
            imageUrl:
              'https://bootcamp-project-api.s3.ap-northeast-2.amazonaws.com/0-1/the-julge/b796561c-5515-4ad8-a252-5e2459e49efd-fGVXc8_qrcode.png',
            originalHourlyPay: 200000,
          },
          href: '/api/0-1/the-julge/shops/1ca5bd34-2cc0-4ae3-b94e-c461d2e3e6f9',
        },
      },
      links: [
        {
          rel: 'self',
          description: '공고 정보',
          method: 'GET',
          href: '/api/0-1/the-julge/shops/1ca5bd34-2cc0-4ae3-b94e-c461d2e3e6f9/notices/c67c8096-c0fb-4d9d-9c8f-0618d02c5a52',
        },
        {
          rel: 'shop',
          description: '가게 정보',
          method: 'GET',
          href: '/api/0-1/the-julge/shops/1ca5bd34-2cc0-4ae3-b94e-c461d2e3e6f9',
        },
      ],
    },
    {
      item: {
        id: 'b116496e-e200-4b33-85a7-c1c117b81eee',
        hourlyPay: 11112,
        startsAt: '2024-03-20T15:00:00.000Z',
        workhour: 11,
        description: 'ㄴㅁㄹㅇ',
        closed: false,
        shop: {
          item: {
            id: '5acd1f65-3296-46f0-844a-ff8c65f47495',
            name: '에바 테스트중',
            category: '한식',
            address1: '서울시 서초구',
            address2: '에바 테스트 중',
            description: 'ㅋㅋ',
            imageUrl:
              'https://bootcamp-project-api.s3.ap-northeast-2.amazonaws.com/0-1/the-julge/afebf6d2-a410-4dba-84bc-c123468d7905-dump%20image.png',
            originalHourlyPay: 10000,
          },
          href: '/api/0-1/the-julge/shops/5acd1f65-3296-46f0-844a-ff8c65f47495',
        },
      },
      links: [
        {
          rel: 'self',
          description: '공고 정보',
          method: 'GET',
          href: '/api/0-1/the-julge/shops/5acd1f65-3296-46f0-844a-ff8c65f47495/notices/b116496e-e200-4b33-85a7-c1c117b81eee',
        },
        {
          rel: 'shop',
          description: '가게 정보',
          method: 'GET',
          href: '/api/0-1/the-julge/shops/5acd1f65-3296-46f0-844a-ff8c65f47495',
        },
      ],
    },
    {
      item: {
        id: '3ddb7188-8ced-4021-9d07-663f98b5411b',
        hourlyPay: 12000,
        startsAt: '2024-07-20T15:00:00.000Z',
        workhour: 4,
        description: 'dasdada',
        closed: false,
        shop: {
          item: {
            id: '63fcc375-5d0a-4ba4-ac5b-101b03973c74',
            name: '에바네 한식❤️',
            category: '한식',
            address1: '서울시 서초구',
            address2: '왜..',
            description: '제발좀 하자하자하자하',
            imageUrl:
              'https://bootcamp-project-api.s3.ap-northeast-2.amazonaws.com/0-1/the-julge/1970eebc-dfaf-4fea-8b86-071c28c3b78d-%EC%9D%B4%EB%AA%A8%EC%A7%80.png',
            originalHourlyPay: 10000,
          },
          href: '/api/0-1/the-julge/shops/63fcc375-5d0a-4ba4-ac5b-101b03973c74',
        },
      },
      links: [
        {
          rel: 'self',
          description: '공고 정보',
          method: 'GET',
          href: '/api/0-1/the-julge/shops/63fcc375-5d0a-4ba4-ac5b-101b03973c74/notices/3ddb7188-8ced-4021-9d07-663f98b5411b',
        },
        {
          rel: 'shop',
          description: '가게 정보',
          method: 'GET',
          href: '/api/0-1/the-julge/shops/63fcc375-5d0a-4ba4-ac5b-101b03973c74',
        },
      ],
    },
  ],
  links: [
    {
      rel: 'self',
      description: '현재 페이지',
      method: 'GET',
      href: '/api/0-1/the-julge/notices?offset=0&limit=6',
    },
    {
      rel: 'prev',
      description: '이전 페이지',
      method: 'GET',
      href: '/api/0-1/the-julge/notices?offset=0&limit=6',
    },
    {
      rel: 'next',
      description: '다음 페이지',
      method: 'GET',
      href: '/api/0-1/the-julge/notices?offset=6&limit=6',
    },
  ],
};

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <article className={styles.suggestWrapper}>
        <SuggestCard data={mockData} residence="서울시 서초구" />
      </article>
      <main className={styles.mainWrapper}>
        <Announce data={mockData} />
      </main>
    </div>
  );
}
