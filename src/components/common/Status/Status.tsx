import styles from './Status.module.scss';

type StatusProps = {
  type: 'pending' | 'accepted' | 'rejected' | 'canceled';
};

const statusType = {
  pending: {
    color: '#20A81E',
    backgroundColor: '#D4F7D4',
    content: '대기중',
  },

  rejected: {
    color: '#FF4040',
    backgroundColor: '#FFEBE7',
    content: '거절',
  },

  accepted: {
    color: '#0080FF',
    backgroundColor: '#CCE6FF',
    content: '승인 완료',
  },

  canceled: {
    color: '#8a1cd6',
    backgroundColor: '#c87aff',
    content: '취소',
  },
};

export default function Status({ type }: StatusProps) {
  return (
    <span
      style={{ color: statusType[type].color, backgroundColor: statusType[type].backgroundColor }}
      className={styles.container}
    >
      {statusType[type].content}
    </span>
  );
}
