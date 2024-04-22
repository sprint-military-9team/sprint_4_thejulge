import Image from 'next/image';
import { CHECK } from '@/utils/constants';
import styles from './MemberButton.module.scss';

type MemberButtonProps = {
  isChecked: boolean;
  children: React.ReactNode;
  onClick: () => void;
};

export default function MemberButton({ isChecked, children, onClick }: MemberButtonProps) {
  return (
    <div className={`${styles.wrapper} ${isChecked && styles.checked}`} onClick={onClick}>
      {isChecked ? <Image src={CHECK} alt="check" width={20} height={20} /> : <div className={styles.checkEmpty} />}
      <div className={styles.text}>{children}</div>
    </div>
  );
}
