import { NoticeDataType, ShopDataType } from '@/types';
import Card from '@/components/common/Card';
import Cookies from 'js-cookie';
import raisePercent from '@/utils/getRaisePercent';

import styles from './CardList.module.scss';
export default function CardList({ noticeList, shopData }: { noticeList: NoticeDataType[]; shopData: ShopDataType }) {
  const shopId = Cookies.get('shopId');
  return (
    <div className={styles.layout}>
      {noticeList.map((notice) => (
        <Card
          key={notice.item.id}
          title={shopData.name}
          image={shopData.imageUrl}
          startTime={notice.item.startsAt}
          workHour={notice.item.workhour}
          salary={notice.item.hourlyPay}
          raise={shopData ? raisePercent(notice.item.hourlyPay, shopData.originalHourlyPay) : 0}
          isRaised={notice?.item.hourlyPay > shopData?.originalHourlyPay}
          location={shopData.address1}
          shopId={shopId}
          completed={
            notice?.item.closed ? '모집 완료' : new Date() > new Date(notice?.item.startsAt) ? '지난 공고' : ''
          }
          noticeId={notice.item.id}
        />
      ))}
    </div>
  );
}
