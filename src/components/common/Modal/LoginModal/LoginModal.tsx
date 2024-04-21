import Image from 'next/image';
import { CHECK } from '@/utils/constants';
import Modal from '../Modal';
import styles from './LoginModal.module.scss';

const MODAL_TEXT = {
  signinError: '비밀번호가 일치하지 않습니다',
  duplicatedEmailError: '이미 사용중인 이메일입니다',
  signupAccepted: '가입이 완료되었습니다!',
  error: '오류가 발생하였습니다. 잠시 후 다시 시도해주세요.',
};

export default function LoginModal({
  type,
  onClose,
}: {
  type: 'signinError' | 'duplicatedEmailError' | 'signupAccepted' | 'error';
  onClose: () => void;
}) {
  return (
    <div>
      <Modal onClose={onClose}>
        <Image src={CHECK} alt="check" width={25} height={25} />
        <h2 className={styles.text}>{MODAL_TEXT[type]}</h2>
        <div className={styles.selectionBox}>
          <button className={styles.positiveButton} type="button" onClick={onClose}>
            확인
          </button>
        </div>
      </Modal>
    </div>
  );
}
