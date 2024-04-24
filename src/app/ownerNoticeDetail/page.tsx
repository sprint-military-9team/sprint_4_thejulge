import Header from '@/components/common/Header/Header';
import Footer from '@/components/common/Footer/Footer';
import { getShopData } from '@/apis/shop';
import { getSpecifyNoticeData } from '@/apis/notice';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import NoticeInformation from '../../components/ownerNoticeDetail/NoticeInformation/NoticeInformation';
import ApplicationList from '../../components/ownerNoticeDetail/ApplicationList/ApplicationList';

type OwnerNoticeDetailProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function ownerNoticeDetail({ searchParams }: OwnerNoticeDetailProps) {
  const cookieStore = cookies();
  const shopId = cookieStore.get('shopId')?.value as string;
  const token = cookieStore.get('token')?.value as string;
  const type = cookieStore.get('type')?.value as string;
  const noticeId = searchParams?.noticeId as string;
  if (!token) {
    redirect('/signin?redirectStatus=needLogin');
  }

  if (type !== 'employer') {
    redirect('/?redirectStatus=invalidAuthority');
  }

  if (!shopId) {
    redirect('/?redirectStatus=invalidAuthority');
  }

  if (!noticeId) {
    redirect('/myshop?redirectStatus=invalidNotice');
  }

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
