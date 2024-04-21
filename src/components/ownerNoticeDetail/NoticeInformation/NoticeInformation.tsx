import Image from 'next/image';
import getTimeDifference from '@/utils/getTimeDifference';
import { CLOCK, GPS, NOTICE_DETAIL_ARROW_UP } from '@/utils/constants';
import Button from '@/components/common/Button';
import styles from './NoticeInformation.module.scss';
import { NoticeInformationDataType, StoreInformationDataType } from '../../../app/ownerNoticeDetail/types';

type NoticeInformationProps = {
  noticeData: NoticeInformationDataType;
  storeData: StoreInformationDataType;
};

export default function NoticeInformation({ noticeData, storeData }: NoticeInformationProps) {
  const additionRate = Math.ceil((noticeData.hourlyPay / storeData.originalHourlyPay) * 100) - 100;
  const viewLabel = noticeData.hourlyPay > storeData.originalHourlyPay;
  return (
    <div className={styles.wrapper}>
      <div className={styles.storeWrapper}>
        <div className={styles.storeTitleWrapper}>
          <div className={`${styles.storeCategory} ${styles.textMediumMedium}`}>{storeData.category}</div>
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
          <div className={styles.noticeFlexWrapper}>
            <div className={styles.noticeContentWrapper}>
              <div className={styles.noticeTitleWrapper}>
                <div className={`${styles.noticeTitleText} ${styles.textMediumMedium}`}>시급</div>
                <div className={styles.noticeTitleContentWrapper}>
                  <p>{`${noticeData.hourlyPay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원`}</p>
                  {viewLabel && (
                    <div className={styles.hourlyPayLabel}>
                      <span>기존 시급보다 {additionRate}%</span>
                      <Image
                        width={20}
                        height={20}
                        src={NOTICE_DETAIL_ARROW_UP}
                        alt="arrow-up"
                        className={styles.arrowUp}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className={`${styles.noticeLabelWrapper} ${styles.textMediumLarge}`}>
                <Image src={CLOCK} alt="시간" width={20} height={20} className={styles.notionLabelImage} />
                <span>{`${getTimeDifference(noticeData.startsAt, noticeData.workhour)} (${noticeData.workhour}시간)`}</span>
              </div>
              <div className={`${styles.noticeLabelWrapper} ${styles.textMediumLarge}`}>
                <Image src={GPS} alt="위치" width={20} height={20} className={styles.notionLabelImage} />
                <span>{storeData.address1}</span>
              </div>
              <pre className={`${styles.storeDescription} ${styles.textMediumLarge}`}>{storeData.description}</pre>
            </div>
            <Button color="white" size="large">
              공고 편집하기
            </Button>
          </div>
        </div>
        <div className={styles.noticeDescription}>
          <div className={`${styles.descriptionTitlte} ${styles.textMediumMedium}`}>공고 설명</div>
          <pre className={`${styles.descriptionContent} ${styles.textMediumLarge}`}>{noticeData.description}</pre>
        </div>
      </div>
    </div>
  );
}