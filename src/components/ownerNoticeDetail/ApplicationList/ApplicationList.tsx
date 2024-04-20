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

  /* const TableData = {
    titles: ['신청자', '소개', '전화번호', '상태'],
    data: [
      ['0652132', '김태진', '안녕하세요', '010-3727-4228', 'pending'],
      ['151522', '김우기', '안녕하세요1', '010-4987-4228', 'pending2'],
    ],
  }; */
  const onClose = () => {
    setShowModal({ type: 'none', onClick: () => {} });
  };
  const onAccept = async (id: string) => {
    await setSpecifyNoticeApplicationStatus(shopId, noticeId, id, 'accepted');
    console.log(`accept: ${id}`);
  };

  const onReject = async (id: string) => {
    await setSpecifyNoticeApplicationStatus(shopId, noticeId, id, 'rejected');
    console.log(`reject: ${id}`);
  };

  const onClickRejectButton = (id: string) => {
    setShowModal({ type: 'reject', onClick: () => onReject(id) });
  };

  const onClickAcceptButton = (id: string) => {
    setShowModal({ type: 'accept', onClick: () => onAccept(id) });
  };
  useEffect(() => {
    const getApplicationData = async (shopID: string, noticeID: string) => {
      const applicationData = await getSpecifyNoticeApplicationData(shopID, noticeID);
      const body = applicationData.map((application) => {
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
    };
    getApplicationData(shopId, noticeId);
  }, [noticeId, shopId]);

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
            allDataCount={tableData.body.length}
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
