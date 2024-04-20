'use client';

import Button from '@/components/common/Button';
import { GPS, PHONE } from '@/utils/constants';
import { useEffect, useState } from 'react';
import { useAsync } from '@/hooks/useAsync';
import { getUserProfile } from '@/apis/profile';
import { UserProfileType } from '@/types';
import Banner from './Banner';
import styles from './Profile.module.scss';
import ProfileEdit from './ProfileEdit';

const isProfileExist = false;
const isApplyHistoryExist = false;

const USER_ID = '04baf4be-52d7-4e0d-8da8-21a646d9a41c'; // user1

// const LIMIT = 4;

export default function Profile() {
  const [isOpened, setIsOpend] = useState(false);
  const [loading, error, getUserProfileAsync] = useAsync(getUserProfile);
  const [userProfile, setUserProfile] = useState({} as UserProfileType);

  const handleCloseEdit = () => {
    setIsOpend(false);
  };

  const handleOpendEdit = () => {
    setIsOpend(true);
  };

  const handleLoadUserProfile = async () => {
    const data = await getUserProfileAsync(USER_ID);
    if (!data) return;
    setUserProfile(data);
  };

  useEffect(() => {
    handleLoadUserProfile();
  }, []);

  return (
    <div className={styles.container}>
      <ProfileEdit isOpend={isOpened} onClose={handleCloseEdit} />
      <main className={styles.main}>
        <section className={styles.profile}>
          <div className={styles.wrapper}>
            {loading ? (
              // 추후에 스켈레톤 UI 넣기
              <div>loading</div>
            ) : (
              <div className={`${isProfileExist && styles.profileContainer}`}>
                <h2 className={`${styles.sectionTitle} ${isProfileExist && styles.notMargin}`}>내 프로필</h2>
                {userProfile.name ? (
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
            )}
          </div>
        </section>
        {isApplyHistoryExist ? (
          <section className={styles.applyList}>
            <div className={styles.wrapper}>
              <h2 className={styles.sectionTitle}>신청 내역</h2>
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
