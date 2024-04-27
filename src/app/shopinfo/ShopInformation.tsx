import Image from 'next/image';
import { NoticeDataType, NoticeSearchDataType } from '@/types';
import { useContext, useEffect, useState } from 'react';
import Registration from '@/components/shopinfoPage/Registartion';
import OwnerAddNotice from '@/components/ownerAddNotice/OwnerAddNotice';
import Cookies from 'js-cookie';
import Button from '@/components/common/Button';
import BASE_URL from '@/constants/BASEURL';
import Card from '@/components/common/Card';
import raisePercent from '@/utils/getRaisePercent';
import { ShopDataContext } from '@/context/ShopDataContext';
import LocationLabel from '@/components/common/LocationLabel/LocationLabel';
import styles from './page.module.scss';

export default function ShopInformation() {
  const [showShopEdit, setShowShopEdit] = useState(false);
  const [showAddNotice, setShowAddNotice] = useState(false);
  const { shopData } = useContext(ShopDataContext);
  const [noticeList, setNoticeList] = useState<NoticeDataType[] | []>([]);
  const shopId = Cookies.get('shopId') || '';
  const hasNoticeList = noticeList.length !== 0;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${BASE_URL}/shops/${shopId}/notices`);
      const data: NoticeSearchDataType = await response.json();
      setNoticeList(data.items);
    };
    fetchData();
  }, [shopId]);

  return (
    <div className={styles.layout}>
      <section className={styles.section}>
        <div>
          <h2 className={styles.title}>내 가게</h2>
          <div className={styles.shopLayout}>
            <article className={styles.shopBox}>
              <Image className={styles.mainImage} src={shopData.imageUrl} alt="shop" width={539} height={308} />
              <div className={styles.shopInfoBox}>
                <p className={styles.label}>식당</p>
                <h1 className={styles.name}>{shopData.name}</h1>
                <LocationLabel address1={shopData.address1} address2={shopData.address2} />
                <p className={styles.description}>{shopData.description}</p>
                <div className={styles.buttonBox}>
                  <Button color="white" size="medium" onClick={() => setShowShopEdit(true)}>
                    편집하기
                  </Button>
                  <Button color="orange" size="medium" onClick={() => setShowAddNotice(true)}>
                    공고 등록하기
                  </Button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
      {showShopEdit && <Registration onClose={() => setShowShopEdit(false)} />}
      {showAddNotice && (
        <div className={styles.modalBox}>
          <OwnerAddNotice onClose={() => setShowAddNotice(false)} />
        </div>
      )}
      <section className={styles.section}>
        <div>
          {hasNoticeList ? (
            <>
              <h2 className={styles.title}>내가 등록한 공고</h2>
              <div className={styles.cardList}>
                {noticeList.map((notice) => (
                  <Card
                    key={notice.item.id}
                    title={shopData.name}
                    image={shopData.imageUrl}
                    startTime={notice.item.startsAt}
                    workHour={notice.item.workhour}
                    salary={notice.item.hourlyPay}
                    raise={shopData ? raisePercent(notice.item.hourlyPay, shopData.originalHourlyPay) : 0}
                    location={shopData.address1}
                    shopId={shopId}
                    completed={
                      notice?.item.closed
                        ? '모집 완료'
                        : new Date() > new Date(notice?.item.startsAt)
                          ? '지난 공고'
                          : ''
                    }
                    noticeId={notice.item.id}
                  />
                ))}
              </div>
            </>
          ) : (
            <section className={styles.section}>
              <div>
                <h2 className={styles.title}>등록한 공고</h2>
                <article className={styles.registerLayout}>
                  <p>공고를 등록해 보세요</p>
                  <div className={styles.registerButton}>
                    <Button color="orange" size="medium" onClick={() => setShowAddNotice(true)}>
                      공고 등록하기
                    </Button>
                  </div>
                </article>
              </div>
            </section>
          )}
        </div>
      </section>
    </div>
  );
}
