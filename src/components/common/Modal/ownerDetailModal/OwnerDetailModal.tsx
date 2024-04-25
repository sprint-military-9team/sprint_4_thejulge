import Image from 'next/image';
import { CHECK } from '@/utils/constants';
import { useRef } from 'react';
import useOutsideClick from '@/hooks/useOutsideClick';
import Modal from '../Modal';
import styles from './OwnerDetailModal.module.scss';

const MODAL_TYPE = {
  accept: {
    text: '신청을 승인하시겠어요?',
    button: '승인하기',
  },
  reject: {
    text: '신청을 거절하시겠어요?',
    button: '거절하기',
  },
};

export default function OwnerDetailModal({
  type,
  onClose,
  onClick,
}: {
  type: 'accept' | 'reject';
  onClose: () => void;
  onClick: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  useOutsideClick(modalRef, onClose);
  return (
    <Modal>
      <div ref={modalRef} className={styles.wrapper}>
        <Image src={CHECK} alt="check" width={25} height={25} />
        <h2 className={styles.text}>{MODAL_TYPE[type].text}</h2>
        <div className={styles.selectionBox}>
          <button className={styles.negativeButton} type="button" onClick={onClose}>
            아니요
          </button>
          <button className={styles.positiveButton} type="button" onClick={onClick}>
            {MODAL_TYPE[type].button}
          </button>
        </div>
      </div>
    </Modal>
  );
}
