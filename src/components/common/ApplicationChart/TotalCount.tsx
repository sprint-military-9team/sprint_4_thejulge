import styles from './TotalCount.module.scss';

type TotalCountProps = {
  count: number;
};

export default function Totalcount({ count }: TotalCountProps) {
  return (
    <div className={styles.textWrapper}>
      <p>지원자 수</p>
      <div className={styles.textContent}>
        <span className={styles.textCount}>{count.toLocaleString()}</span> 명
      </div>
    </div>
  );
}
