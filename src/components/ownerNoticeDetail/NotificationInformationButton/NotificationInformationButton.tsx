'use client';

import OwnerAddNotice from '@/components/ownerAddNotice/OwnerAddNotice';
import Button from '@/components/common/Button';
import { useCallback, useState } from 'react';
import styles from './NotificationInformationButton.module.scss';

export default function NotificationInformationButton() {
  const [isAdd, setIsAdd] = useState(false);
  const onClose = useCallback(() => {
    setIsAdd(false);
  }, []);
  const onClick = useCallback(() => {
    setIsAdd(true);
  }, []);
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div className={styles.buttonWrapper}>
        <Button color="white" size="large" onClick={onClick}>
          공고 편집하기
        </Button>
      </div>

      {isAdd && (
        <div className={styles.wrapper}>
          <OwnerAddNotice onClose={onClose} />
        </div>
      )}
    </div>
  );
}
