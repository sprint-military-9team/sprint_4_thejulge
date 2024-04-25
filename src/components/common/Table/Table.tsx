import { ReactNode } from 'react';
import styles from './Table.module.scss';
import Status from '../Status';

type Header<T> = {
  id: keyof T & string;
  name: string;
};

type TableProps<T> = {
  header: Header<T>[];
  body: T[];
  type: 'owner' | 'worker';
  onClickRejectButton?: (id: string) => void;
  onClickAcceptButton?: (id: string) => void;
};
export default function Table<T extends { id: string; status: 'pending' | 'rejected' | 'accepted' | 'canceled' }>({
  header,
  body,
  type,
  onClickRejectButton,
  onClickAcceptButton,
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
                    <div className={styles.btnContainer}>
                      <button
                        className={`${styles.btn} ${styles.reject}`}
                        type="button"
                        onClick={() => {
                          if (!onClickRejectButton) return;
                          onClickRejectButton(item.id);
                        }}
                      >
                        거절하기
                      </button>
                      <button
                        className={`${styles.btn} ${styles.accept}`}
                        type="button"
                        onClick={() => {
                          if (!onClickAcceptButton) return;
                          onClickAcceptButton(item.id);
                        }}
                      >
                        승인하기
                      </button>
                    </div>
                  ) : id === 'status' ? (
                    <Status type={item.status} />
                  ) : (
                    (item[id] as ReactNode)
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
