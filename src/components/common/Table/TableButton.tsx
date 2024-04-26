'use client';

import { useState } from 'react';
import { ModalType } from '@/components/ownerNoticeDetail/ApplicationList/types';
import { setSpecifyNoticeApplicationStatus } from '@/apis/application';
import Cookies from 'js-cookie';
import { useRouter, useSearchParams } from 'next/navigation';
import Modal from '../Modal/Modal';
import styles from './TableButton.module.scss';
import OwnerDetailModal from '../Modal/ownerDetailModal/OwnerDetailModal';

type TableButtonProps = {
  id: string;
};

export default function TableButton({ id }: TableButtonProps) {
  const router = useRouter();
  const params = useSearchParams();
  const shopId = Cookies.get('shopId') as string;
  const noticeId = params.get('noticeId') as string;
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState<ModalType>({
    type: 'none',
    onClick: () => {},
  });
  const onClose = () => {
    setShowModal({ type: 'none', onClick: () => {} });
  };

  const handleError = (status: number | null) => {
    if (!status) {
      router.refresh();
    } else if (status === 400) {
      Cookies.set('redirectStatus', 'closedNotice');
      router.refresh();
    } else if (status === 401) {
      router.push('/login');
      Cookies.set('redirectStatus', 'needLogin');
    } else if (status === 404) {
      throw new Error('가게 특정 공고 지원 상태 변경 오류');
    }
  };
  const onReject = async () => {
    if (!isLoading) {
      setIsLoading(true);
      console.log(`reject: ${id}`);
      const error = await setSpecifyNoticeApplicationStatus(shopId, noticeId, id, 'rejected');
      handleError(error);
      setIsLoading(false);
    }
  };
  const onAccept = async () => {
    if (!isLoading) {
      setIsLoading(true);
      console.log(`accept: ${id}`);
      const error = await setSpecifyNoticeApplicationStatus(shopId, noticeId, id, 'accepted');
      handleError(error);
      setIsLoading(false);
    }
  };

  const handleClickAcceptButton = () => {
    setShowModal({ type: 'accept', onClick: () => onAccept() });
  };

  const handleClcikRejectButton = () => {
    setShowModal({ type: 'reject', onClick: () => onReject() });
  };
  return (
    <>
      <div className={styles.btnContainer}>
        <button className={`${styles.btn} ${styles.reject}`} type="button" onClick={handleClcikRejectButton}>
          거절하기
        </button>
        <button className={`${styles.btn} ${styles.accept}`} type="button" onClick={handleClickAcceptButton}>
          승인하기
        </button>
      </div>
      {showModal.type !== 'none' && (
        <Modal>
          <OwnerDetailModal type={showModal.type} onClose={onClose} onClick={showModal.onClick} />
        </Modal>
      )}
    </>
  );
}
