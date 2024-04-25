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
  const [showModal, setShowModal] = useState<ModalType>({
    type: 'none',
    onClick: () => {},
  });
  const onClose = () => {
    setShowModal({ type: 'none', onClick: () => {} });
  };
  const onReject = async () => {
    console.log(`reject: ${id}`);
    await setSpecifyNoticeApplicationStatus(shopId, noticeId, id, 'rejected');
    router.refresh();
  };
  const onAccept = async () => {
    console.log(`accept: ${id}`);
    await setSpecifyNoticeApplicationStatus(shopId, noticeId, id, 'accepted');
    router.refresh();
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
        <Modal onClose={onClose}>
          <OwnerDetailModal type={showModal.type} onClose={onClose} onClick={showModal.onClick} />
        </Modal>
      )}
    </>
  );
}
