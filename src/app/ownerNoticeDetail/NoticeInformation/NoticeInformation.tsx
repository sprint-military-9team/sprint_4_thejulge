import Image from 'next/image';
import getTimeDifference from '@/app/utils/getTimeDifference';
import { CLOCK, GPS } from '@/utils/constants';
import Button from '@/components/common/Button';
import styles from './NoticeInformation.module.scss';
import { NoticeInformationDataType, StoreInformationDataType } from '../types';

type NoticeInformationProps = {
  noticeData: NoticeInformationDataType;
  storeData: StoreInformationDataType;
};

export default function NoticeInformation({ noticeData, storeData }: NoticeInformationProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.storeWrapper}>
        <div className={styles.storeTitleWrapper}>
          <div className={styles.storeCategory}>{storeData.category}</div>
          <div className={styles.storeName}>{storeData.name}</div>
        </div>
        <div className={styles.noticeWrapper}>
          <Image
            src={storeData.imageUrl}
            alt="식당 이미지"
            width={539}
            height={308}
            priority
            className={styles.storeImage}
          />
          <div className={styles.noticeContentWrapper}>
            <div className={styles.noticeTitleWrapper}>
              <div className={styles.noticeTitleText}>시급</div>
              <div className={styles.noticeTitleContentWrapper}>
                <p>{noticeData.hourlyPay}</p>
              </div>
            </div>
            <div className={styles.noticeFlexWrapper}>
              <Image src={CLOCK} alt="시간" width={20} height={20} />
              <span>{`${getTimeDifference(noticeData.startsAt, noticeData.workhour)} (${noticeData.workhour}시간)`}</span>
            </div>
            <div className={styles.noticeFlexWrapper}>
              <Image src={GPS} alt="위치" width={20} height={20} />
              <span>{storeData.address1}</span>
            </div>
            <pre className={styles.storeDescription}>{storeData.description}</pre>
            <Button color="white" size="large">
              공고 편집
            </Button>
          </div>
        </div>
        <div className={styles.noticeDescription}>
          <div className={styles.descriptionTitlte}>공고 설명</div>
          <pre className={styles.descriptionContent}>{noticeData.description}</pre>
        </div>
      </div>
    </div>
  );
}
