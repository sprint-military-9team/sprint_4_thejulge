import Image from 'next/image';
import { CHECK } from '@/utils/constants';
import Modal from '../Modal';
import styles from './RejectionModal.module.scss';

export default function RejectionModal({ isModal, onClose }: { isModal: boolean; onClose: () => void }) {
  return (
    <div>
      {isModal && (
        <Modal onClose={onClose}>
          <Image src={CHECK} alt="check" width={25} height={25} />
          <h2 className={styles.text}>신청을 거절하시겠어요?</h2>
          <div className={styles.selectionBox}>
            <button className={styles.negativeButton} type="button" onClick={onClose}>
              아니요
            </button>
            <button className={styles.positiveButton} type="button" onClick={onClose}>
              예
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
