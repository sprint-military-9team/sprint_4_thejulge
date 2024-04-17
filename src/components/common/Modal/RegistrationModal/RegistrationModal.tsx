import Image from 'next/image';
import { EXCLAMATION } from '@/utils/constants';
import Modal from '../Modal';
import styles from './RegistrationModal.module.scss';

export default function RegistrationModal({ isModal, onClose }: { isModal: boolean; onClose: () => void }) {
  return (
    <div>
      {isModal && (
        <Modal onClose={onClose}>
          <Image src={EXCLAMATION} alt="check" width={25} height={25} />
          <h2 className={styles.text}>가게 정보를 먼저 등록해 주세요. </h2>
          <button className={styles.button} type="button" onClick={onClose}>
            확인
          </button>
        </Modal>
      )}
    </div>
  );
}
