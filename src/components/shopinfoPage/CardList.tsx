import { NoticeDataType, ShopDataType } from '@/types';
import Card from '@/components/common/Card';
import Cookies from 'js-cookie';
import raisePercent from '@/utils/getRaisePercent';
import styles from './CardList.module.scss';

export default function CardList({ noticeList, shopData }: { noticeList: NoticeDataType[]; shopData: ShopDataType }) {
  const shopId = Cookies.get('shopId');
  const today = new Date();
  today.setHours(today.getHours() + 9);
  return (
    <>
      <h2 className={styles.title}>내가 등록한 공고</h2>
      <div className={styles.layout}>
        {noticeList.map((notice) => (
          <Card
            key={notice.item.id}
            title={shopData.name}
            image={shopData.imageUrl}
            startTime={notice.item.startsAt}
            workHour={notice.item.workhour}
            salary={String(notice.item.hourlyPay)}
            raise={shopData ? raisePercent(notice.item.hourlyPay, shopData.originalHourlyPay) : 0}
            isRaised={notice?.item.hourlyPay > shopData?.originalHourlyPay}
            location={shopData.address1}
            shopId={shopId}
            completed={notice?.item.closed ? '모집 완료' : today > new Date(notice?.item.startsAt) ? '지난 공고' : ''}
            noticeId={notice.item.id}
          />
        ))}
      </div>
    </>
  );
}
