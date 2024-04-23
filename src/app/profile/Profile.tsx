import Button from '@/components/common/Button';
import { GPS, PHONE } from '@/utils/constants';
import { getUserProfile } from '@/apis/profile';
import Image from 'next/image';
import Banner from './Banner';
import styles from './Profile.module.scss';
import ProfileTableContainer from './ProfileTableContainer';

export default async function Profile() {
  const USER_ID = Cookies.get('userId') as string;
  console.log('쉬발:', USER_ID);

  // middleware 덕분에 undefined 아닌게 확실
  const userProfile = await getUserProfile();
  // console.log('userId:', USER_ID);
  // const userProfile = { name: 'adf' };
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
                    <div>
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
                  onClick={() => {}}
                />
              )}
            </div>
          </div>
        </section>
        <ProfileTableContainer />
      </main>
    </div>
  );
}
