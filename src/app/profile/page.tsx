'use client';

import Button from '@/components/common/Button';
import { GPS, PHONE } from '@/utils/constants';
import { useState } from 'react';
import Table from '@/components/common/Table';
import Pagination from '@/components/common/Pagination';
import Banner from './Banner';
import styles from './Profile.module.scss';
import ProfileEdit from './ProfileEdit';

const isProfileExist = true;
const isApplyHistoryExist = true;

const data = {
  items: [
    {
      item: {
        id: 'string',
        status: 'pending | accepted | rejected | canceled',
        createdAt: 'string',
        shop: {
          item: {
            id: 'string',
            name: 'string',
            category: 'string',
            address1: 'string',
            address2: 'string',
            description: 'string',
            imageUrl: 'string',
            originalHourlyPay: 'number',
          },
          href: 'string',
        },
        notice: {
          item: {
            id: 'string',
            hourlyPay: 'number',
            description: 'string',
            startsAt: 'string',
            workhour: 'number',
            closed: 'boolean',
          },
        },
      },
      links: [],
    },
  ],
};

const refinedData = data.items.map((item) => [
  item.item.id,
  item.item.shop.item.name,
  item.item.notice.item.startsAt,
  item.item.notice.item.hourlyPay,
  item.item.status,
]);

const tableData = {
  titles: ['가게', '일자', '시급', '상태'],
  data: refinedData,
};

const LIMIT = 4;

export default function Profile() {
  const [isOpened, setIsOpend] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleCloseEdit = () => {
    setIsOpend(false);
  };

  const handleOpendEdit = () => {
    setIsOpend(true);
  };

  return (
    <div className={styles.container}>
      <ProfileEdit isOpend={isOpened} onClose={handleCloseEdit} />
      <main className={styles.main}>
        <section className={styles.profile}>
          <div className={styles.wrapper}>
            <div className={`${isProfileExist && styles.profileContainer}`}>
              <h2 className={`${styles.sectionTitle} ${isProfileExist && styles.notMargin}`}>내 프로필</h2>
              {isProfileExist ? (
                <div className={styles.profileCard}>
                  <div>
                    <p className={styles.nameLabel}>이름</p>
                    <p className={styles.name}>김태진</p>
                    <p className={styles.phone}>
                      <img src={PHONE} alt="phone" />
                      <span>010-3727-4228</span>
                    </p>
                    <p className={styles.region}>
                      <img src={GPS} alt="gps" />
                      <span>선호 지역: 대전 유성구</span>
                    </p>
                    <p className={styles.bio}>안녕하세요. 알바 구합니다.</p>
                  </div>
                  <div>
                    <Button color="white" size="medium">
                      편집하기
                    </Button>
                  </div>
                </div>
              ) : (
                <Banner
                  description="내 프로필을 등록하고 원하는 가게에 지원해 보세요."
                  buttonContent="내 프로필 등록하기"
                  onClick={handleOpendEdit}
                />
              )}
            </div>
          </div>
        </section>
        {isApplyHistoryExist ? (
          <section className={styles.applyList}>
            <div className={styles.wrapper}>
              <h2 className={styles.sectionTitle}>신청 내역</h2>
              <div style={{ border: '1px solid red' }}>
                <Table datas={tableData} />
                <Pagination
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
                  allDataCount={40}
                  perPageDataCount={LIMIT}
                />
              </div>
            </div>
          </section>
        ) : (
          <section className={styles.applyList}>
            <div className={styles.wrapper}>
              <h2 className={styles.sectionTitle}>신청 내역</h2>
              <Banner description="아직 신청 내역이 없어요." buttonContent="공고 보러가기" linkPath="/" />
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
