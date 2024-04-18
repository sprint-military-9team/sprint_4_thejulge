import { CLOSE } from '@/utils/constants';
import Dropdown from '@/components/common/Dropdown/Dropdown';
import { SEOULGROUPLIST } from '@/constants/SEOUL';
import styles from './ProfileEdit.module.scss';

type ProfileEditProps = {
  isOpend: boolean;
  onClose: () => void;
};

export default function ProfileEdit({ isOpend, onClose }: ProfileEditProps) {
  const handleCloseClick = () => {
    onClose();
  };

  return (
    <div className={`${styles.container} ${isOpend && styles.opacity}`}>
      <div className={styles.wrapper}>
        <div className={styles.contents}>
          <div className={styles.header}>
            <h2 className={styles.title}>내 프로필</h2>
            <button type="button" className={styles.button} onClick={handleCloseClick}>
              <img src={CLOSE} alt="close" />
            </button>
          </div>

          <form className={styles.form}>
            <div className={styles.inputListArea}>
              <div className={styles.inputArea}>
                <div className={styles.inputAreaWrapper}>
                  <label className={styles.label} htmlFor="name">
                    이름*
                  </label>
                  <input id="name" type="text" />
                </div>
              </div>
              <div className={styles.inputArea}>
                <div className={styles.inputAreaWrapper}>
                  <label className={styles.label}>연락처*</label>
                  <input type="tel" />
                </div>
              </div>
              <div className={styles.inputArea}>
                <div className={styles.inputAreaWrapper}>
                  <label className={styles.label}>주소</label>
                  <Dropdown optionList={SEOULGROUPLIST} initialOption="asdf" />
                </div>
              </div>
            </div>
            <div className={styles.textArea}>
              <label htmlFor="bio" className={styles.label}>
                소개
              </label>
              <textarea id="bio" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
