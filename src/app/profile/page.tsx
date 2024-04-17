import Footer from '@/components/common/Footer/Footer';
import Banner from './Banner';
import styles from './Profile.module.scss';

export default function Profile() {
  const isProfileExist = false;
  /*
    받아온 데이터에 name, phone, address, bio가 없으면 isProfileExist를 false로
  */
  return (
    <div className={styles.container}>
      <div className={styles.header}>..</div>
      <main className={styles.main}>
        <section className={styles.profile}>
          <div className={styles.wrapper}>
            {isProfileExist ? (
              <>adfjo</>
            ) : (
              <>
                <h2 className={styles.sectionTitle}>내 프로필</h2>
                <Banner
                  description="내 프로필을 등록하고 원하는 가게에 지원해 보세요."
                  buttonContent="내 프로필 등록하기"
                  linkPath="/"
                />
              </>
            )}
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
