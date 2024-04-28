import { useState } from 'react';
import Button from '../common/Button';
import styles from './NoticeRegistration.module.scss';
import OwnerAddNotice from '../ownerAddNotice/OwnerAddNotice';

export default function NoticeRegistration() {
  const [showAddNotice, setShowAddNotice] = useState(false);
  return (
    <article className={styles.registerLayout}>
      <p>공고를 등록해 보세요</p>
      <div className={styles.registerButton}>
        <Button color="orange" size="medium" onClick={() => setShowAddNotice(true)}>
          공고 등록하기
        </Button>
      </div>
      {showAddNotice && (
        <div className={styles.modalBox}>
          <OwnerAddNotice onClose={() => setShowAddNotice(false)} />
        </div>
      )}
    </article>
  );
}
