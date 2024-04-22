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
  const noticeId = 'fccaf5b1-b5ba-450c-a58e-0d22f4651f6c';

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
      <NoticeInformation noticeData={NOTICE_DATA} storeData={STORE_DATA} />
      <ApplicationList shopId={shopId} noticeId={noticeId} />
      <Footer />
    </>
  );
}
