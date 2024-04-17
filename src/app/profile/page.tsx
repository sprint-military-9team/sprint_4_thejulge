import Banner from './Banner';
import styles from './Profile.module.scss';

export default function Profile() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>..</div>
      <main className={styles.main}>
        <section className={styles.profile}>
          <div className={styles.wrapper}>
            <h2 className={styles.sectionTitle}>내 프로필</h2>
            <Banner
              description="내 프로필을 등록하고 원하는 가게에 지원해 보세요."
              buttonContent="내 프로필 등록하기"
            />
          </div>
        </section>
      </main>
      <div className={styles.footer}>..</div>
    </div>
  );
}
