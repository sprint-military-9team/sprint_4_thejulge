import Header from '@/components/common/Header/Header';
import Footer from '@/components/common/Footer/Footer';
import { getShopData } from '@/apis/shop';
import { getSpecifyNoticeData } from '@/apis/notice';
import { cookies } from 'next/headers';
import NoticeInformation from '../../components/ownerNoticeDetail/NoticeInformation/NoticeInformation';
import ApplicationList from '../../components/ownerNoticeDetail/ApplicationList/ApplicationList';

export default async function ownerNoticeDetail() {
  const cookieStore = cookies();
  const cookie = cookieStore.get('shopId');
  if (!cookie) {
    return <div>error</div>;
  }
  const shopId = cookie.value;
  const noticeId = '61a36d05-5036-42f5-bbe3-9e6f815c2a79';

  const getStoreData = async (shopID: string) => {
    const { id, name, category, address1, description, imageUrl, originalHourlyPay } = await getShopData(shopID);
    return { id, name, category, address1, description, imageUrl, originalHourlyPay };
  };

  const getNoticeData = async (shopID: string, noticeID: string) => {
    const { id, hourlyPay, startsAt, workhour, description, closed } = await getSpecifyNoticeData(shopID, noticeID);
    return { id, hourlyPay, startsAt, workhour, description, closed };
  };

  const STORE_DATA = await getStoreData(shopId);
  const NOTICE_DATA = await getNoticeData(shopId, noticeId);

  return (
    <>
      <Header notificationListData={[]} />
      <div style={{ position: 'relative', width: '100%', height: 'fit-content' }}>
        <NoticeInformation noticeData={NOTICE_DATA} storeData={STORE_DATA} />
        <ApplicationList shopId={shopId} noticeId={noticeId} />
      </div>
      <Footer />
    </>
  );
}
