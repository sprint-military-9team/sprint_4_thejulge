import Header from '@/components/common/Header/Header';
import Footer from '@/components/common/Footer/Footer';
import NoticeInformation from './NoticeInformation/NoticeInformation';

export default function ownerNoticeDetail() {
  /* 
    parameter
    noticeID
    shopID
    가게 데이터(/shops/{shop_id})
    ->
    공고 데이터
    /shops/{shopID}/notices/{notice_id}/applications

  */
  /* const shopId = 'd3398bdc-4f7b-4457-b6b6-588928dc7e2f';
  const noticeId = 'fccaf5b1-b5ba-450c-a58e-0d22f4651f6c'; */
  const NOTICE_DATA = {
    id: 'fccaf5b1-b5ba-450c-a58e-0d22f4651f6c',
    hourlyPay: 11000,
    startsAt: '2024-04-21T15:00:00.000Z',
    workhour: 9,
    description:
      '기존 알바 친구가 그만둬서 새로운 친구를 구했는데, 그 사이에 하루가 비네요.\n급해서 시급도 높였고 그렇게 바쁜 날이 아니라서 괜찮을거예요.',
    closed: false,
  };
  const STORE_DATA = {
    id: 'd3398bdc-4f7b-4457-b6b6-588928dc7e2f',
    name: 'test1',
    category: '양식',
    address1: '서울시 용산구',
    description:
      '알바하기 편한 너구리네 라면집!\n라면 올려두고 끓이기만 하면 되어서 쉬운 편에 속하는 가게입니다.\n라면 올려두고 끓이기만 하면 되어서 쉬운 편에 속하는 가게입니다.',
    imageUrl:
      'https://bootcamp-project-api.s3.ap-northeast-2.amazonaws.com/0-1/the-julge/1bdb43c8-ff08-4a46-81b0-7f91efced98c-jinju4.png',
    originalHourPay: 10100,
  };

  const HEADER_DATA = [
    {
      id: '1',
      name: 'test1',
      startsAt: '2024-04-16T15:00:00.000Z',
      createdAt: '2024-04-15T15:06:15.633Z',
      workhour: 3,
      result: 'accepted',
      read: false,
    },
    {
      id: '2',
      name: 'test2',
      startsAt: '2024-04-16T15:00:00.000Z',
      createdAt: '2024-04-12T15:06:15.633Z',
      workhour: 6,
      result: 'rejected',
      read: false,
    },
    {
      id: '3',
      name: 'test3',
      startsAt: '2024-04-16T15:00:00.000Z',
      createdAt: '2024-03-19T15:06:15.633Z',
      workhour: 12,
      result: 'rejected',
      read: false,
    },
    {
      id: '4',
      name: 'test4',
      startsAt: '2024-04-16T15:00:00.000Z',
      createdAt: '2023-03-15T15:06:15.633Z',
      workhour: 4,
      result: 'rejected',
      read: false,
    },
    {
      id: '5',
      name: 'test5',
      startsAt: '2024-04-16T15:00:00.000Z',
      createdAt: '2024-04-16T15:06:15.633Z',
      workhour: 4,
      result: 'rejected',
      read: false,
    },
  ];

  return (
    <>
      <Header memberType="owner" notificationListData={HEADER_DATA} />
      <NoticeInformation noticeData={NOTICE_DATA} storeData={STORE_DATA} />
      <Footer />
    </>
  );
}
