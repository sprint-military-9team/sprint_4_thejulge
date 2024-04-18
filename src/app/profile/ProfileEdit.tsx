import { CLOSE } from '@/utils/constants';
import styles from './ProfileEdit.module.scss';

export default function ProfileEdit() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.contents}>
          <div className={styles.header}>
            <h2 className={styles.title}>내 프로필</h2>
            <button type="button" className={styles.button}>
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
                  <input type="text" />
                </div>
              </div>
              <div className={styles.inputArea}>
                <div className={styles.inputAreaWrapper}>
                  <label className={styles.label}>주소</label>
                  <input type="text" />
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
