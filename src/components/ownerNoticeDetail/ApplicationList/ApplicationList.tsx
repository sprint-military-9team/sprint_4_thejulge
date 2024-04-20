'use client';

import Table from '@/components/common/Table';
import Pagination from '@/components/common/Pagination';
import { useEffect, useState } from 'react';
import { getSpecifyNoticeApplicationData, setSpecifyNoticeApplicationStatus } from '@/apis/application';
import Modal from '@/components/common/Modal/Modal';
import OwnerDetailModal from '@/components/common/Modal/ownerDetailModal/OwnerDetailModal';
import styles from './ApplicationList.module.scss';
import { ModalType } from './types';

type HeaderType = {
  id: 'id' | 'name' | 'bio' | 'phone' | 'status';
  name: string;
};

type BodyType = {
  id: string;
  name: string | undefined;
  bio: string | undefined;
  phone: string | undefined;
  status: 'pending' | 'rejected' | 'accepted';
};

type TableData = {
  header: HeaderType[];
  body: BodyType[];
};

type ApplicationListProps = {
  shopId: string;
  noticeId: string;
};

export default function ApplicationList({ shopId, noticeId }: ApplicationListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [showModal, setShowModal] = useState<ModalType>({
    type: 'none',
    onClick: () => {},
  });
  const [tableData, setTableData] = useState<TableData>({
    header: [
      { id: 'name', name: '신청자' },
      { id: 'bio', name: '소개' },
      { id: 'phone', name: '전화번호' },
      { id: 'status', name: '상태' },
    ],
    body: [],
  });

  const onClose = () => {
    setShowModal({ type: 'none', onClick: () => {} });
  };
  const onAccept = async (id: string) => {
    console.log(`accept: ${id}`);
    await setSpecifyNoticeApplicationStatus(shopId, noticeId, id, 'accepted');
  };

  const onReject = async (id: string) => {
    console.log(`reject: ${id}`);
    await setSpecifyNoticeApplicationStatus(shopId, noticeId, id, 'rejected');
  };

  const onClickRejectButton = (id: string) => {
    setShowModal({ type: 'reject', onClick: () => onReject(id) });
  };

  const onClickAcceptButton = (id: string) => {
    setShowModal({ type: 'accept', onClick: () => onAccept(id) });
  };
  useEffect(() => {
    const getApplicationData = async (shopID: string, noticeID: string) => {
      const applicationData = await getSpecifyNoticeApplicationData(
        shopID,
        noticeID,
        7 * (currentPage - 1),
        7 * currentPage,
      );
      const body = applicationData.items.map((application) => {
        const {
          item: {
            id,
            status,
            user: {
              item: { name, phone, bio },
            },
          },
        } = application;
        return { id, name, bio, phone, status };
      });
      setTableData((previousData) => ({ ...previousData, body }));
      setTotalCount(applicationData.count);
    };
    getApplicationData(shopId, noticeId);
  }, [noticeId, shopId, currentPage]);

  return (
    <div className={styles.section}>
      <div className={styles.wrapper}>
        <div className={styles.title}>신청자 목록</div>
        <div>
          <Table
            header={tableData.header}
            body={tableData.body}
            type="owner"
            onClickAcceptButton={onClickAcceptButton}
            onClickRejectButton={onClickRejectButton}
          />
          <Pagination
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            allDataCount={totalCount}
            perPageDataCount={7}
          />
          {showModal.type !== 'none' && (
            <Modal onClose={onClose}>
              <OwnerDetailModal type={showModal.type} onClose={onClose} onClick={showModal.onClick} />
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
}
