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
import ProfileTableContainer from './ProfileTableContainer';

const USER_ID = '4896c2a6-3c24-4f26-9f5d-84c4b13db4fd'; // user1

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
              <div className={`${userProfile.name && styles.profileContainer}`}>
                <h2 className={`${styles.sectionTitle} ${userProfile.name && styles.notMargin}`}>내 프로필</h2>
                {userProfile.name ? (
                  <div className={styles.profileCard}>
                    <div>
                      <p className={styles.nameLabel}>이름</p>
                      <p className={styles.name}>{userProfile.name}</p>
                      <p className={styles.phone}>
                        <img src={PHONE} alt="phone" />
                        <span>{userProfile.phone}</span>
                      </p>
                      <p className={styles.region}>
                        <img src={GPS} alt="gps" />
                        <span>선호 지역: {userProfile.address}</span>
                      </p>
                      <p className={styles.bio}>{userProfile.bio}</p>
                    </div>
                    <div>
                      <div onClick={handleOpendEdit}>
                        <Button color="white" size="medium" style={{ padding: '1rem 1.4rem' }}>
                          편집하기
                        </Button>
                      </div>
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
        <ProfileTableContainer />
      </main>
    </div>
  );
}
