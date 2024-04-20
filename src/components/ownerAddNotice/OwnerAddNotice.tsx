'use client';

import Image from 'next/image';
import { CLOSE_ICON } from '@/utils/constants';
import { useCallback, useState } from 'react';
import { postNotice } from '@/apis/notice';
import { useRouter } from 'next/navigation';
import styles from './OwnerAddNotice.module.scss';
import Input from '../common/Input/Input';
import Button from '../common/Button';
import { InputDataType } from './types';

type OwnerAddNoticeProps = {
  onClose: () => void;
};

export default function OwnerAddNotice({ onClose }: OwnerAddNoticeProps) {
  const router = useRouter();
  const shopId = 'd3398bdc-4f7b-4457-b6b6-588928dc7e2f';
  const [hourlyPay, setHourlyPay] = useState('');
  const [startsAt, setStartsAt] = useState('');
  const [workhour, setWorkhour] = useState('');
  const [description, setDescription] = useState('');

  const [hourlyPayError, setHourlyPayError] = useState(false);
  const [startsAtError, setStartsAtError] = useState(false);
  const [workhourError, setWorkhourError] = useState(false);

  const changeHoulyPay = useCallback((value: string) => {
    setHourlyPay(value);
  }, []);
  const changeStartsAt = useCallback((value: string) => {
    setStartsAt(value);
  }, []);
  const changeWorkhour = useCallback((value: string) => {
    setWorkhour(value);
  }, []);

  const changeHourlyPayError = useCallback(() => {
    setHourlyPayError(false);
  }, []);
  const changeStartsAtError = useCallback(() => {
    setStartsAtError(false);
  }, []);
  const changeWorkhourError = useCallback(() => {
    setWorkhourError(false);
  }, []);

  const handleChangeDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleClickCloseButton = () => {
    onClose();
  };

  const changeDateType = (date: string) => {
    const inputDate = new Date(date);
    const formattedDate = `${inputDate.toISOString().slice(0, 19)}Z`;
    return formattedDate;
  };

  const INPUT_DATA: InputDataType[] = [
    {
      id: 'hourlyPay',
      type: 'number',
      value: hourlyPay,
      label: '시급*',
      errorMessage: '제대로 된 값을 입력해주세요',
      isError: hourlyPayError,
      onChange: changeHoulyPay,
      onFocus: changeHourlyPayError,
      unit: '원',
    },
    {
      id: 'startsAt',
      type: 'datetime-local',
      value: startsAt,
      label: '시작 일시*',
      errorMessage: '제대로 된 값을 입력해주세요',
      isError: startsAtError,
      onChange: changeStartsAt,
      onFocus: changeStartsAtError,
    },
    {
      id: 'workhour',
      type: 'number',
      value: workhour,
      label: '업무 시간*',
      errorMessage: '제대로 된 값을 입력해주세요',
      isError: workhourError,
      onChange: changeWorkhour,
      onFocus: changeWorkhourError,
      unit: '시간',
    },
  ];

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!hourlyPay) {
      setHourlyPayError(true);
    }
    if (!startsAt) {
      setStartsAtError(true);
    }
    if (!workhour) {
      setWorkhourError(true);
    }
    if (!hourlyPay || !startsAt || !workhour) {
      return;
    }
    const APIFlag = await postNotice(shopId, {
      hourlyPay: Number(hourlyPay),
      startsAt: changeDateType(startsAt),
      workhour: Number(workhour),
      description,
    });
    if (APIFlag) {
      alert('등록이 완료되었습니다.');
      router.push('/ownerNoticeDetail');
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.contentWrapper}>
        <div className={styles.titleWrapper}>
          <span>공고 등록</span>
          <Image
            src={CLOSE_ICON}
            alt="close"
            width={32}
            height={32}
            className={styles.button}
            onClick={handleClickCloseButton}
          />
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputWrapper}>
            <div className={styles.inputFlexWrapper}>
              {INPUT_DATA.map((data) => (
                <div className={styles.inputComponentWrapper} key={data.id}>
                  <Input
                    id={data.id}
                    type={data.type}
                    value={String(data.value)}
                    label={data.label}
                    unit={data.unit}
                    onChange={data.onChange}
                    onFocus={data.onFocus}
                    isError={data.isError}
                    errorMessage={data.errorMessage}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className={styles.descriptionWrapper}>
            <div className={styles.descriptionLabel}>공고 설명</div>
            <textarea
              id="description"
              className={styles.textArea}
              onChange={handleChangeDescription}
              value={description}
            />
          </div>
          <div className={styles.buttonWrapper} onClick={handleSubmit}>
            <Button color="orange" size="large">
              등록하기
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
