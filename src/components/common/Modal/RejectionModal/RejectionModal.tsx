import Image from 'next/image';
import { CHECK } from '@/utils/constants';
import Modal from '../Modal';
import Button from '../../Button';
import styles from './RejectionModal.module.scss';

export default function RejectionModal({
  isModal,
  noClick,
  cancelClick,
}: {
  isModal: boolean;
  noClick: (event: React.MouseEvent) => void;
  cancelClick: () => void;
}) {
  return (
    <div>
      {isModal && (
        <Modal onClose={cancelClick}>
          <Image src={CHECK} alt="check" width={25} height={25} />
          <h2 className={styles.text}>신청을 거절하시겠어요?</h2>
          <div className={styles.selectionBox}>
            <div onClick={noClick}>
              <Button color="white" size="medium" style={{ padding: '1rem 2rem' }}>
                아니오
              </Button>
            </div>
            <div onClick={cancelClick}>
              <Button color="orange" size="medium" style={{ padding: '1rem 2rem' }}>
                취소하기
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
