import { GPS, PHONE } from '@/utils/constants';
import { getUserProfile } from '@/apis/profile';
import Image from 'next/image';
import { cookies } from 'next/headers';
import Banner from './Banner';
import styles from './Profile.module.scss';
import ProfileTableContainer from './ProfileTableContainer';
import ControlModal from './Control';

export default async function Profile({ searchParams }: { searchParams: { page: string } }) {
  const { page = 1 } = searchParams;
  const cookie = cookies().get('userId');
  const userProfile = await getUserProfile(cookie?.value as string);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <section className={styles.profile}>
          <div className={styles.wrapper}>
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
                    <ControlModal defaultValues={userProfile} />
                  </div>
                </div>
              ) : (
                <Banner
                  description="내 프로필을 등록하고 원하는 가게에 지원해 보세요."
                  buttonContent="내 프로필 등록하기"
                  isPageChange={false}
                />
              )}
            </div>
          </div>
        </section>
        <ProfileTableContainer currentPage={Number(page)} />
      </main>
    </div>
  );
}
