'use client';

import OwnerAddNotice from '@/components/ownerAddNotice/OwnerAddNotice';
import Button from '@/components/common/Button';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { NoticeInformationDataType } from '@/app/ownerNoticeDetail/types';
import styles from './NotificationInformationButton.module.scss';

type NotificationInformationButtonProps = {
  noticeData: NoticeInformationDataType;
};

export default function NotificationInformationButton({ noticeData }: NotificationInformationButtonProps) {
  const router = useRouter();
  const [isAdd, setIsAdd] = useState(false);
  const onClose = useCallback(() => {
    setIsAdd(false);
    router.push('/ownerNoticeDetail');
  }, [router]);
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
          <OwnerAddNotice onClose={onClose} noticeData={noticeData} />
        </div>
      )}
    </div>
  );
}
