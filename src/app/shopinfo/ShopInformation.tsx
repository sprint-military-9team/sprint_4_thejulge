import { useContext, useEffect, useState } from 'react';
import MyShop from '@/components/shopinfoPage/MyShop';
import NoticeRegistration from '@/components/shopinfoPage/NoticeRegistration';
import Cookies from 'js-cookie';
import BASE_URL from '@/constants/BASEURL';
import { ShopDataContext } from '@/context/ShopDataContext';
import CardList from '@/components/shopinfoPage/CardList';
import styles from './page.module.scss';

export default function ShopInformation() {
  const { shopData, updateShopData } = useContext(ShopDataContext);
  const [noticeList, setNoticeList] = useState([]);
  const shopId = Cookies.get('shopId') || '';
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const fetchShopData = async () => {
      try {
        const shopResponse = await fetch(`${BASE_URL}/shops/${shopId}`);
        const shopResponseData = await shopResponse.json();
        updateShopData(shopResponseData.item);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchNoticeData = async () => {
      try {
        const noticeResponse = await fetch(`${BASE_URL}/shops/${shopId}/notices`);
        const noticeData = await noticeResponse.json();
        setNoticeList(noticeData.items);
      } catch (error) {
        console.log(error);
      }
    };
    fetchShopData();
    fetchNoticeData();
    setMounted(true);
  }, [shopId]);

  const hasNoticeList = noticeList.length !== 0;

  if (!mounted) return null;
  return (
    <div className={styles.layout}>
      <MyShop shopData={shopData} />
      <section>
        {hasNoticeList ? <CardList noticeList={noticeList} shopData={shopData} /> : <NoticeRegistration />}
      </section>
    </div>
  );
}
