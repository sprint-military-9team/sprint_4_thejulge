'use client';

import Image from 'next/image';
import getNotificationContent from '@/app/utils/getNotificationContent';
import getTimeDifference from '@/app/utils/getTimeDifference';
import { useState, useEffect, useRef } from 'react';
import { CLOSE_ICON, NOTIFICATION_ACTIVE, NOTIFICATION_INACTIVE } from '@/app/utils/constants';
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

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      event.stopPropagation();
      event.preventDefault();
      if (isOpen && notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);

    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

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
            {notificationNumber ? (
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
                      {getNotificationContent(notification.name, notification.startsAt, notification.workhour)}
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
                    <div className={styles.notificationDate}>{getTimeDifference(notification.createdAt)}</div>
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
