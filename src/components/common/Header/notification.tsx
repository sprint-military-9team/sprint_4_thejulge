'use client';

import Image from 'next/image';
import getCurrentTimeDifference from '@/utils/getCurrentTimeDifference';
import { useState, useEffect, useRef, useCallback, useContext } from 'react';
import { CLOSE_ICON, NOTIFICATION_ACTIVE, NOTIFICATION_INACTIVE } from '@/utils/constants';
import useOutsideClick from '@/hooks/useOutsideClick';
import getTimeDifference from '@/utils/getTimeDifference';
import { getUserAlert, putUserAlert } from '@/apis/alert';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { DarkModeContext } from '@/context/DarkModeContext';
import { NotificationDataType } from './types';
import styles from './Notification.module.scss';

export default function Notification() {
  const router = useRouter();
  const notificationRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [notificationNumber, setNotificationNumber] = useState<number>(0);
  const [notificationData, setNotificationData] = useState<NotificationDataType[]>([]);
  const { isDarkMode } = useContext(DarkModeContext);

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
      setNotificationData((previousData) => previousData.filter((notification) => !notification.read && notification));
    }
  }, [isOpen]);

  useEffect(() => {
    const getData = async () => {
      const token = Cookies.get('token');
      if (token) {
        const alertData = await getUserAlert();
        if (typeof alertData === 'number') {
          Cookies.remove('token');
          Cookies.remove('userId');
          Cookies.remove('type');
          router.push('/');
          Cookies.set('redirectStatus', 'invalidAuthority');
          return;
        }
        setNotificationData(alertData);
        setNotificationNumber(alertData.length);
      }
    };
    getData();
  }, []);

  const handleClickNotification = async (id: string, isRead: boolean) => {
    if (isRead) {
      return;
    }
    const status = await putUserAlert(id);
    if (status === '403') {
      Cookies.remove('token');
      Cookies.remove('userId');
      Cookies.remove('type');
      router.push('/signin');
      Cookies.set('redirectStatus', 'needLogin');
      return;
    }
    setNotificationData((previousData) =>
      previousData.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    );
    setNotificationNumber((previousCount) => previousCount - 1);
  };

  return (
    <div className={styles.notification}>
      <Image
        src={notificationNumber ? NOTIFICATION_ACTIVE : NOTIFICATION_INACTIVE}
        style={
          isDarkMode && {
            filter: 'invert(100%) sepia(0%) saturate(7484%) hue-rotate(242deg) brightness(300%) contrast(100%)',
          }
        }
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
                    onClick={() => handleClickNotification(notification.id, notification.read)}
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
