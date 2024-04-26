import styles from './Table.module.scss';
import Status from '../Status';
import TableButton from './TableButton';

type Header<T> = {
  id: keyof T & string;
  name: string;
};

type TableProps<T> = {
  header: Header<T>[];
  body: T[];
  type: 'owner' | 'worker';
};
export default function Table<T extends { id: string; status: 'pending' | 'rejected' | 'accepted' | 'canceled' }>({
  header,
  body,
  type,
}: TableProps<T>) {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.tr}>
            {header.map(({ id, name }, index) => (
              <th
                key={id}
                className={`${styles.th} ${index === 0 || index === header.length - 1 ? styles.edges : index === header.length - 2 ? styles.penult : styles.middles}`}
              >
                {name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {body.map((item) => (
            <tr key={item.id} className={styles.tr}>
              {header.map(({ id }, index_header) => (
                <td
                  key={id}
                  className={`${styles.td} ${index_header === 0 || index_header === header.length - 1 ? styles.edges : index_header === header.length - 2 ? styles.penult : styles.middles}`}
                >
                  {type === 'owner' && id === 'status' && item[id] === 'pending' ? (
                    <TableButton id={item.id} />
                  ) : id === 'status' ? (
                    <Status type={item.status} />
                  ) : (
                    (item[id] as React.ReactNode)
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
