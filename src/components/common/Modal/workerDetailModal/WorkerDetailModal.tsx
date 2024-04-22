import Image from 'next/image';
import { WARNING } from '@/utils/constants';
import Modal from '../Modal';
import styles from './workerDetail.module.scss';
import Button from '../../Button';

export default function WorkerDetailModal({
  isModal,
  onClick,
}: {
  isModal: boolean;
  onClick: (event: React.MouseEvent) => void;
}) {
  return (
    <div>
      {isModal && (
        <Modal>
          <div className={styles.wrapper}>
            <div className={styles.warningWrapper}>
              <Image src={WARNING} alt="check" width={25} height={25} />
              <h2 className={styles.text}>내 프로필을 먼저 등록해주세요. </h2>
            </div>
            <div className={styles.buttonWrapper}>
              <Button size="small" color="white" style={{ width: '8rem' }} onClick={onClick}>
                확인
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
