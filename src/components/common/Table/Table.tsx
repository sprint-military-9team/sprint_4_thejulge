import styles from './Table.module.scss';

type Datas = {
  titles: string[];
  data: string[][];
};

type TableProps = {
  datas: Datas;
};

export default function Table({ datas }: TableProps) {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.tr}>
            {datas.titles.map((title, index) => (
              <th
                key={title}
                className={`${styles.th} ${index === 0 || index === datas.titles.length - 1 ? styles.edges : styles.middles}`}
              >
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {datas.data.map((item) => (
            <tr key={item[0]} className={styles.tr}>
              {datas.titles.map((title, index) => (
                <td
                  key={title}
                  className={`${styles.td} ${index === 0 || index === datas.titles.length - 1 ? styles.edges : styles.middles}`}
                >
                  {item[index + 1]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
