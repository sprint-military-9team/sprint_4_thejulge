'use client';

import Image from 'next/image';
import { CLOSE_ICON } from '@/utils/constants';
import { useState } from 'react';
import styles from './OwnerAddNotice.module.scss';
import Input from '../common/Input/Input';
import Button from '../common/Button';

type ErrorType = {
  [key: string]: boolean;
};

export default function OwnerAddNotice() {
  const [error, setError] = useState<ErrorType>({
    hourlyPay: false,
    startsAt: false,
    workhour: false,
  });
  const changeDateType = (date: string) => {
    const inputDate = new Date(date);
    const formattedDate = `${inputDate.toISOString().slice(0, 19)}Z`;
    return formattedDate;
  };

  const handleClickCloseButton = () => {
    console.log('close');
  };

  const INPUT_DATA = [
    { id: 'hourlyPay', type: 'number', label: '시급*', necessary: true, errorMessage: '제대로 된 값을 입력해주세요' },
    {
      id: 'startsAt',
      type: 'datetime-local',
      label: '시작 일시*',
      necessary: true,
      errorMessage: '제대로 된 값을 입력해주세요',
    },
    {
      id: 'workhour',
      type: 'number',
      label: '업무 시간*',
      necessary: true,
      errorMessage: '제대로 된 값을 입력해주세요',
    },
  ];

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const inputError: ErrorType = {};
    const inputData = {};
    INPUT_DATA.forEach((data) => {
      const { value } = document.getElementById(data.id) as HTMLFormElement;
      const dataValue = data.type === 'datetime-local' && value ? changeDateType(value) : value;
      Object.assign(inputError, { [data.id]: Boolean((value === '' || value === '0') && data.necessary) });
      Object.assign(inputData, { [data.id]: data.type === 'number' ? Number(dataValue) : dataValue });
    });
    const { value } = document.getElementById('description') as HTMLFormElement;
    Object.assign(inputData, { description: value });
    setError(inputError);
    const flag = Object.keys(inputError).every((data) => !inputError[data]);
    if (!flag) {
      return;
    }
    console.log(inputData);
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
                    type={data.type}
                    id={data.id}
                    label={data.label}
                    isError={error[data.id]}
                    errorMessage={data.errorMessage}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className={styles.descriptionWrapper}>
            <div className={styles.descriptionLabel}>공고 설명</div>
            <textarea id="description" className={styles.textArea} />
          </div>
          <div className={styles.buttonWrapper} onClick={handleSubmit}>
            <Button color="orange" size="large">
              제출
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
