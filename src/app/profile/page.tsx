import Footer from '@/components/common/Footer/Footer';
import Button from '@/components/common/Button';
import { GPS, PHONE } from '@/utils/constants';
import Banner from './Banner';
import styles from './Profile.module.scss';

export default function Profile() {
  const isProfileExist = true;
  /*
    받아온 데이터에 name, phone, address, bio가 없으면 isProfileExist를 false로
  */
  return (
    <div className={styles.container}>
      <div className={styles.header}>..</div>
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
                  linkPath="/"
                />
              )}
            </div>
          </div>
        </section>
        <section className={styles.applyList}>
          <div className={styles.wrapper}>
            <h2 className={styles.sectionTitle}>신청 내역</h2>
            <Banner description="아직 신청 내역이 없어요." buttonContent="공고 보러가기" linkPath="/" />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
