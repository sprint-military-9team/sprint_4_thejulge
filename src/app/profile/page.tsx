'use client';

import Button from '@/components/common/Button';
import { GPS, PHONE } from '@/utils/constants';
import { useEffect, useState } from 'react';
import { useAsync } from '@/hooks/useAsync';
import { getUserProfile } from '@/apis/profile';
import { UserProfileType } from '@/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Banner from './Banner';
import styles from './Profile.module.scss';
import ProfileEdit from './ProfileEdit';
import ProfileTableContainer from './ProfileTableContainer';

const USER_ID = '04baf4be-52d7-4e0d-8da8-21a646d9a41c'; // user1

export default function Profile() {
  const router = useRouter();
  const [isOpened, setIsOpend] = useState(false);
  const [loading, error, getUserProfileAsync] = useAsync(getUserProfile, true);
  const [userProfile, setUserProfile] = useState({} as UserProfileType);
  const [update, setUpdate] = useState(false);

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
  }, [update]);

  if (error) {
    // 임시로 랜딩페이지로 리다이렉트 추후, 오류 페이지로 바꿀예정
    router.push('/');
  }

  return (
    <div className={styles.container}>
      {!loading && (
        <ProfileEdit
          triggerProfileUpdate={() => {
            setUpdate((prev) => !prev);
          }}
          defaultValues={userProfile}
          isOpend={isOpened}
          onClose={handleCloseEdit}
        />
      )}
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
                        <Image width={20} height={20} src={PHONE} alt="phone" />
                        <span>{userProfile.phone}</span>
                      </p>
                      <p className={styles.region}>
                        <Image width={20} height={20} src={GPS} alt="gps" />
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
