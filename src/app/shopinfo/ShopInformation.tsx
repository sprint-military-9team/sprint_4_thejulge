import { NoticeDataType, NoticeSearchDataType } from '@/types';
import { useContext, useEffect, useState } from 'react';
import MyShop from '@/components/shopinfoPage/MyShop';
import NoticeRegistration from '@/components/shopinfoPage/NoticeRegistration';
import Cookies from 'js-cookie';
import BASE_URL from '@/constants/BASEURL';
import { ShopDataContext } from '@/context/ShopDataContext';
import styles from './page.module.scss';
import CardList from './CardList';

export default function ShopInformation() {
  const { shopData, updateShopData } = useContext(ShopDataContext);
  const [noticeList, setNoticeList] = useState<NoticeDataType[] | []>([]);
  const shopId = Cookies.get('shopId') || '';
  const hasNoticeList = noticeList.length !== 0;

  useEffect(() => {
    const fetchShopData = async () => {
      const result = await fetch(`${BASE_URL}/shops/${shopId}`);
      const data = await result.json();
      updateShopData(data.item);
    };

    const fetchNoticeData = async () => {
      const response = await fetch(`${BASE_URL}/shops/${shopId}/notices`);
      const data: NoticeSearchDataType = await response.json();
      setNoticeList(data.items);
    };

    fetchShopData();
    fetchNoticeData();
  }, [shopId]);

  return (
    <div className={styles.layout}>
      <MyShop shopData={shopData} />
      <section>
        <h2 className={styles.title}>등록한 공고</h2>
        {hasNoticeList ? <CardList noticeList={noticeList} shopData={shopData} /> : <NoticeRegistration />}
      </section>
    </div>
  );
}
