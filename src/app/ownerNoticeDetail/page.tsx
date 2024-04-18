import Header from '@/components/common/Header/Header';
import Footer from '@/components/common/Footer/Footer';
import { getShopData } from '@/apis/shop';
import { getSpecifyNoticeData } from '@/apis/notice';
import NoticeInformation from '../../components/ownerNoticeDetail/NoticeInformation/NoticeInformation';
import ApplicationList from '../../components/ownerNoticeDetail/ApplicationList/ApplicationList';

export default async function ownerNoticeDetail() {
  const shopId = 'd3398bdc-4f7b-4457-b6b6-588928dc7e2f';
  const noticeId = 'fccaf5b1-b5ba-450c-a58e-0d22f4651f6c';

  const getStoreData = async (shopID: string) => {
    const { id, name, category, address1, description, imageUrl, originalHourPay } = await getShopData(shopID);
    return { id, name, category, address1, description, imageUrl, originalHourPay };
  };

  const getNoticeData = async (shopID: string, noticeID: string) => {
    const { id, hourlyPay, startsAt, workhour, description, closed } = await getSpecifyNoticeData(shopID, noticeID);
    return { id, hourlyPay, startsAt, workhour, description, closed };
  };

  const STORE_DATA = await getStoreData(shopId);
  const NOTICE_DATA = await getNoticeData(shopId, noticeId);

  return (
    <>
      <Header memberType="owner" notificationListData={[]} />
      <NoticeInformation noticeData={NOTICE_DATA} storeData={STORE_DATA} />
      <ApplicationList shopId={shopId} noticeId={noticeId} />
      <Footer />
    </>
  );
}
