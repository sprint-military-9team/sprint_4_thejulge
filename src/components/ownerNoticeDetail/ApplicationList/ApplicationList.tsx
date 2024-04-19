'use client';

import Table from '@/components/common/Table';
import Pagination from '@/components/common/Pagination';
import { useEffect, useState } from 'react';
import { getSpecifyNoticeApplicationData, setSpecifyNoticeApplicationStatus } from '@/apis/application';
import Modal from '@/components/common/Modal/Modal';
import OwnerDetailModal from '@/components/common/Modal/ownerDetailModal/OwnerDetailModal';
import styles from './ApplicationList.module.scss';
import { ModalType, TableDataType } from './types';

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
  const [TableData, setTableData] = useState<TableDataType>({
    titles: ['신청자', '소개', '전화번호', '상태'],
    data: [],
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
      const data = applicationData.map((application) => {
        const {
          item: {
            id,
            status,
            user: {
              item: { name, phone, bio },
            },
          },
        } = application;
        return [id, name, bio, phone, status];
      });
      setTableData({ titles: ['신청자', '소개', '전화번호', '상태'], data });
    };
    getApplicationData(shopId, noticeId);
  }, [noticeId, shopId]);
  return (
    <div className={styles.section}>
      <div className={styles.wrapper}>
        <div className={styles.title}>신청자 목록</div>
        <button type="button" onClick={() => onClickRejectButton('f99961ed-de1c-4ad9-b7ad-cffe97465dd4')}>
          거절하기
        </button>
        <button type="button" onClick={() => onClickAcceptButton('f99961ed-de1c-4ad9-b7ad-cffe97465dd4')}>
          등록하기
        </button>
        <div>
          <Table datas={TableData} />
          <Pagination
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            allDataCount={TableData.data.length}
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
