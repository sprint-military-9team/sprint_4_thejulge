import Button from '@/components/common/Button';
import Modal from '../Modal';
import styles from './CompletionModal.module.scss';

export default function CompletionModal({
  isModal,
  onClose,
  type,
}: {
  isModal: boolean;
  onClose: () => void;
  type: 'registration' | 'edit';
}) {
  return (
    <div>
      {isModal && (
        <Modal>
          <div className={styles.layout}>
            <h2 className={styles.text}>{type === 'edit' ? '수정' : '등록'}이 완료되었습니다. </h2>
            <div className={styles.buttonBox}>
              <Button color="orange" size="medium" onClick={onClose}>
                확인
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
