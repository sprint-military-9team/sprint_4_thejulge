import { ReactNode } from 'react';
import styles from './Table.module.scss';
import Status from '../Status';

type Header<T> = {
  id: keyof T;
  name: string;
};

type TableProps<T> = {
  header: Header<T>[];
  body: T[];
  type: string;
  onClickRejectButton?: () => void;
  onClickAcceptButton?: () => void;
};

const generateUniqueId = (number: number) => {
  const timestamp = Date.now().toString(36); // 현재 시간을 36진수로 변환
  const randomStr = Math.random().toString(36).substr(2, 5); // 랜덤 숫자를 36진수로 변환
  return timestamp + randomStr + number;
};

export default function Table<T>({ header, body, type, onClickRejectButton, onClickAcceptButton }: TableProps<T>) {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.tr}>
            {header.map(({ id, name }, index) => (
              <th
                key={id as string}
                className={`${styles.th} ${index === 0 || index === header.length - 1 ? styles.edges : styles.middles}`}
              >
                {name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {body.map((item, index) => (
            <tr key={generateUniqueId(index)} className={styles.tr}>
              {header.map(({ id }, index_header) => (
                <td
                  key={id as string}
                  className={`${styles.td} ${index_header === 0 || index_header === header.length - 1 ? styles.edges : styles.middles}`}
                >
                  {type === 'owner' && id === 'status' && item[id] === 'pending' ? (
                    <div className={styles.btnContainer}>
                      <button className={`${styles.btn} ${styles.reject}`} type="button" onClick={onClickRejectButton}>
                        거절하기
                      </button>
                      <button className={`${styles.btn} ${styles.accept}`} type="button" onClick={onClickAcceptButton}>
                        승인하기
                      </button>
                    </div>
                  ) : id === 'status' ? (
                    <Status type={item[id] as 'pending' | 'rejected' | 'accepted'} />
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
