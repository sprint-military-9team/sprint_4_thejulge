import styles from './TableStyled.module.scss';

export default function Table() {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.tr}>
            <th className={`${styles.th} ${styles.firstColumn}`}>가게</th>
            <th className={`${styles.th} ${styles.secondColumn}`}>일자</th>
            <th className={`${styles.th} ${styles.thirdColumn}`}>시급</th>
            <th className={`${styles.th} ${styles.forthColumn}`}>상태</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          <tr className={styles.tr}>
            <td className={styles.td}>너구리네라면집</td>
            <td className={styles.td}>2023.01.12 10:00 ~ 12:00 (2시간)</td>
            <td className={styles.td}>12,500원</td>
            <td className={styles.td}>대기중</td>
          </tr>
          <tr className={styles.tr}>
            <td className={styles.td}>너구리네라면집</td>
            <td className={styles.td}>2023.01.12 10:00 ~ 12:00 (2시간)</td>
            <td className={styles.td}>12,500원</td>
            <td className={styles.td}>대기중</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
