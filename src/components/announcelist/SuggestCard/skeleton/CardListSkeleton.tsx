import Card from './CardSkeleton';
import styles from './CardListSkeleton.module.scss';

export default function CardListSkeleton({ title, length }: { title: string; length: number }) {
  const dataList = [];
  for (let i = 0; i < length; i += 1) {
    dataList.push(i);
  }
  return (
    <section className={styles.sectionWrapper}>
      {title && <p className={styles.title}>{title}</p>}
      <div className={styles.cardWrapper}>
        {dataList.map((data) => (
          <Card key={data} />
        ))}
      </div>
    </section>
  );
}
