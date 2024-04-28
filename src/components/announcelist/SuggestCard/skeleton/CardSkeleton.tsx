import styles from './CardSkeleton.module.scss';

function Card() {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.imageWrapper} />
      <div className={styles.contentWrapper}>
        <div className={styles.title} />
        <div className={styles.time} />
        <div className={styles.location} />
        <div className={styles.salary} />
      </div>
    </div>
  );
}
export default Card;
