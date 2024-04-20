'use client';

import Image from 'next/image';
import getCurrentTimeDifference from '@/utils/getCurrentTimeDifference';
import { useState, useEffect, useRef, useCallback } from 'react';
import { CLOSE_ICON, NOTIFICATION_ACTIVE, NOTIFICATION_INACTIVE } from '@/utils/constants';
import useOutsideClick from '@/hooks/useOutsideClick';
import getTimeDifference from '@/utils/getTimeDifference';
import { NotificationDataType } from './types';
import styles from './Notification.module.scss';

type NotificationProps = {
  notificationData: NotificationDataType[];
  notificationNumber: number;
  handleClickNotification: (event: React.MouseEvent<HTMLDivElement>, read: boolean) => void;
  changeNotificationData: () => void;
};

export default function Notification({
  notificationData,
  notificationNumber,
  handleClickNotification,
  changeNotificationData,
}: NotificationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  const handleClickNotificationButton = () => {
    setIsOpen((previousStatus) => !previousStatus);
  };

  const handleClickCloseButton = () => {
    setIsOpen(false);
  };

  const onClose = useCallback(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [isOpen]);

  useOutsideClick(notificationRef, onClose);

  useEffect(() => {
    if (!isOpen) {
      changeNotificationData();
    }
  }, [isOpen, changeNotificationData]);
  return (
    <div className={styles.notification}>
      <Image
        src={notificationNumber ? NOTIFICATION_ACTIVE : NOTIFICATION_INACTIVE}
        alt="notification"
        width={20}
        height={20}
        onClick={handleClickNotificationButton}
        role="presentation"
      />
      {isOpen && (
        <div className={styles.notificationWindow} ref={notificationRef}>
          <div className={styles.notificationTitleWrapper}>
            <div className={styles.notificationTitle}>{`알림 ${notificationNumber}개`}</div>
            <Image
              src={CLOSE_ICON}
              alt="close"
              width={24}
              height={24}
              className={styles.notificationClose}
              onClick={handleClickCloseButton}
            />
          </div>
          <div className={styles.notificationList}>
            {notificationData.length > 0 ? (
              <>
                {notificationData.map((notification) => (
                  <div
                    id={notification.id}
                    key={notification.id}
                    className={notification.read ? styles.notificationReadWrapper : styles.notificationWrapper}
                    onClick={(event) => handleClickNotification(event, notification.read)}
                    role="presentation"
                  >
                    <div
                      className={
                        notification.result === 'accepted' ? styles.notificationBlueFin : styles.notificationRedFin
                      }
                    />
                    <div className={styles.notificationText}>
                      {`${notification.name}(${getTimeDifference(notification.startsAt, notification.workhour)}) 공고 지원이`}
                      &nbsp;
                      <span
                        className={
                          notification.result === 'accepted'
                            ? styles.notificationBlueStatus
                            : styles.notificationRedStatus
                        }
                      >
                        {notification.result === 'accepted' ? '승인' : '거절'}
                      </span>
                      되었어요.
                    </div>
                    <div className={styles.notificationDate}>{getCurrentTimeDifference(notification.createdAt)}</div>
                  </div>
                ))}
              </>
            ) : (
              <div className={styles.notificationEmpty}>알림이 없습니다</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
