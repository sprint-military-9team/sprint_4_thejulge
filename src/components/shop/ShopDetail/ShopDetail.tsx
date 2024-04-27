'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Cookies from 'js-cookie';
import WorkerDetailModal from '@/components/common/Modal/workerDetailModal/WorkerDetailModal';
import raisePercent from '@/utils/getRaisePercent';
import getWorkTime from '@/utils/getWorkTime';
import getShopDetailData from '@/apis/shopdetail';
import { CLOCK, CARDARROW } from '@/utils/constants';
import { toast, ToastContainer } from 'react-toastify';
import { postApplicationNotice, putApplicationNotice, getUserApplication } from '@/apis/applicationNotice';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@/components/common/Button/';
import RejectionModal from '@/components/common/Modal/RejectionModal/RejectionModal';
import LocationLabel from '@/components/common/LocationLabel/LocationLabel';
import styles from './shopdetail.module.scss';
import { MainData, ButtonProps } from './type';
import ButtonStatus from './ButtonStatus';

interface CompletedMessageProps {
  completed: string;
}

function CompletedMessage({ completed }: CompletedMessageProps) {
  return (
    <div className={styles.completeWrapper}>
      <span className={styles.complete}>{completed}</span>
    </div>
  );
}

function ShopDetail() {
  const [noticeData, setNoticeData] = useState<MainData | null>(null);
  const [userApplicationStatus, setUserApplicationStatus] = useState({ id: '', status: 'none' });
  const [buttonProps, setButtonProps] = useState<ButtonProps>({
    status: 'none',
    onClick: () => {},
  });
  const [isRejectionModalOpen, setIsRejectionModalOpen] = useState(false);
  const [isWorkerDetailModalOpen, setIsWorkerDetailModalOpen] = useState(false);
  const params = useSearchParams();
  const shopId = params.get('shopId');
  const noticeId = params.get('noticeId');
  const raise = noticeData ? raisePercent(noticeData.item.hourlyPay, noticeData.item.shop.item.originalHourlyPay) : 0;
  const workTime = noticeData ? getWorkTime(noticeData.item.startsAt, noticeData.item.workhour) : '00:00';
  const today = new Date();
  const completed = noticeData
    ? noticeData.item.closed
      ? '마감 완료'
      : today > new Date(noticeData.item.startsAt)
        ? '지난 공고'
        : ''
    : '';
  const shopImage = noticeData ? noticeData?.item.shop.item.imageUrl : '';

  const router = useRouter();
  const token = Cookies.get('token');
  const userId = Cookies.get('userId');
  const type = Cookies.get('type');

  const handleClickApplicationButton = () => {
    if (token) {
      const postApplication = async () => {
        try {
          const data = await postApplicationNotice(shopId, noticeId, token);
          setUserApplicationStatus({ id: data.item.id, status: data.item.status });
          toast.success('공고 신청이 완료되었습니다.');
        } catch (error) {
          toast.error('공고 신청에 실패했습니다.');
        }
      };
      postApplication();
    } else {
      setIsWorkerDetailModalOpen(true);
    }
  };

  const handleClickCancelButton = () => {
    setIsRejectionModalOpen(true);
  };

  const handleWorkerModal = (event: React.MouseEvent) => {
    event.preventDefault();
    router.push('/signin');
  };

  const handleModalCancelClick = () => {
    if (token) {
      const putApplication = async () => {
        try {
          const data = await putApplicationNotice(shopId, noticeId, token, userApplicationStatus.id, 'canceled');
          setUserApplicationStatus({ id: data.item.id, status: data.item.status });
          toast.success('공고 신청 취소가 완료되었습니다.');
        } catch (error) {
          toast.error('공고 신청 취소에 실패했습니다.');
        }
      };
      putApplication();
    }
    setIsRejectionModalOpen(false);
  };
  const handleModalNoClick = () => {
    setIsRejectionModalOpen(false);
  };
  useEffect(() => {
    if (userApplicationStatus.status === 'none' || userApplicationStatus.status === 'canceled') {
      setButtonProps({ status: 'canceled', onClick: handleClickApplicationButton });
    } else if (userApplicationStatus.status === 'pending') {
      setButtonProps({ status: 'pending', onClick: handleClickCancelButton });
    } else if (userApplicationStatus.status === 'accepted') {
      setButtonProps({ status: 'accepted', onClick: () => {} });
    } else if (userApplicationStatus.status === 'rejected') {
      setButtonProps({ status: 'rejected', onClick: () => {} });
    }
  }, [userApplicationStatus]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getShopDetailData(shopId, noticeId);
        setNoticeData(data);
      } catch (error) {
        toast.error('가게정보를 불러오는데 실패했습니다.');
      }
    };
    fetchData();
    if (token) {
      const fetchUserApplication = async (offset = 0, limit = 20) => {
        try {
          const data = await getUserApplication(userId, token, offset, limit);
          const applicationData = data.items.filter((item) => item.item.notice.item.id === noticeId);
          if (applicationData.length > 0) {
            setUserApplicationStatus({ id: applicationData[0].item.id, status: applicationData[0].item.status });
          } else if (data.hasNext) {
            fetchUserApplication(offset + limit, limit);
          }
        } catch (error) {
          toast.error('유저지원 정보를 불러오는데 실패하였습니다.');
        }
      };
      fetchUserApplication();
    } else {
      setUserApplicationStatus({ id: '', status: 'none' });
    }
  }, [shopId, noticeId]);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
        limit={1}
      />
      <div className={styles.shopDetail}>
        <div className={styles.titleWrapper}>
          <span className={styles.title}>식당</span>
          <p className={styles.shopTitle}>{noticeData?.item.shop.item.name}</p>
        </div>
        <div className={styles.notice}>
          <div className={styles.shopImageWrapper}>
            <Image fill src={shopImage} alt="shopImage" />
            {completed && <CompletedMessage completed={completed} />}
          </div>
          <div className={styles.noticeContent}>
            <div className={styles.noticeInfo}>
              <div className={styles.noticeInfoTitle}>
                <span className={styles.title}>시급</span>
                <div className={styles.noticeInfoSalary}>
                  <span className={styles.shopTitle}>{noticeData?.item.hourlyPay}원</span>
                  <div className={styles.raise}>
                    <span>기존 시급보다 {raise}%</span>
                    <Image src={CARDARROW} alt="arrow" width={20} height={20} />
                  </div>
                </div>
              </div>
              <div className={styles.noticeInfoTimeLoc}>
                <Image src={CLOCK} alt="clock" width={20} height={20} />
                <span>{workTime}</span>
              </div>
              <LocationLabel
                address1={noticeData?.item.shop.item.address1}
                address2={noticeData?.item.shop.item.address2}
              />
              <span className={styles.noticeInfoDescription}>{noticeData?.item.shop.item.description}</span>
              {completed || type === 'employer' ? (
                <Button color="disabled" size="large">
                  신청 불가
                </Button>
              ) : (
                <div>
                  <ButtonStatus {...buttonProps} />
                  {isWorkerDetailModalOpen && <WorkerDetailModal isModal onClick={handleWorkerModal} />}
                  {isRejectionModalOpen && (
                    <RejectionModal
                      isModal={isRejectionModalOpen}
                      cancelClick={handleModalCancelClick}
                      noClick={handleModalNoClick}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.shopDescription}>
          <p className={styles.titleDescription}>공고 설명</p>
          <p className={styles.description}>{noticeData?.item.description}</p>
        </div>
      </div>
    </>
  );
}

export default ShopDetail;
