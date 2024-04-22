'use client';

import Image from 'next/image';
import { CLOSE_ICON } from '@/utils/constants';
import { useCallback, useEffect, useState } from 'react';
import { postNotice } from '@/apis/notice';
import { useRouter } from 'next/navigation';
import useInput from '@/hooks/useInput';
import Cookies from 'js-cookie';
import { NoticeInformationDataType } from '@/app/ownerNoticeDetail/types';
import styles from './OwnerAddNotice.module.scss';
import Input from '../common/Input/Input';
import Button from '../common/Button';
import { InputDataType } from './types';

type OwnerAddNoticeProps = {
  onClose?: () => void;
  noticeData?: NoticeInformationDataType;
};

export default function OwnerAddNotice({ onClose, noticeData }: OwnerAddNoticeProps) {
  const router = useRouter();
  const shopId = Cookies.get('shopId') as string;
  const [description, setDescription] = useState('');
  const {
    value: hourlyPay,
    error: hourlyPayError,
    changeValue: changeHoulyPay,
    changeError: changeHourlyPayError,
    clearError: clearHourlyPayError,
  } = useInput();

  const {
    value: startsAt,
    error: startsAtError,
    changeValue: changeStartsAt,
    changeError: changeStartsAtError,
    clearError: clearStartsAtError,
  } = useInput();

  const {
    value: workhour,
    error: workhourError,
    changeValue: changeWorkhour,
    changeError: changeWorkhourError,
    clearError: clearWorkhourError,
  } = useInput();

  const onBlurHourlyPay = () => {
    if (!hourlyPay) {
      changeHourlyPayError('값을 입력해주세요.');
    }
  };
  const onBlurStartsAt = () => {
    if (!startsAt) {
      changeStartsAtError('값을 입력해주세요.');
    }
  };
  const onBlurWorkhour = () => {
    if (!workhour) {
      changeWorkhourError('값을 입력해주세요.');
    }
  };
  const changeMoneyType = (number: string) => {
    const realNumber = Number(number.replaceAll(',', ''));
    const formattedNumber = realNumber.toLocaleString();
    return formattedNumber;
  };

  const onChangeHourlyPay = useCallback(
    (value: string) => {
      changeHoulyPay(changeMoneyType(value));
    },
    [changeHoulyPay],
  );

  const changeDateType = (date: string) => {
    const inputDate = new Date(date);
    const formattedDate = `${inputDate.toISOString().slice(0, 19)}Z`;
    return formattedDate;
  };

  const handleChangeDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleClickCloseButton = () => {
    if (onClose) {
      onClose();
    }
  };

  const INPUT_DATA: InputDataType[] = [
    {
      id: 'hourlyPay',
      type: 'string',
      value: hourlyPay,
      label: '시급*',
      errorMessage: '제대로 된 값을 입력해주세요',
      isError: Boolean(hourlyPayError),
      onChange: onChangeHourlyPay,
      onFocus: clearHourlyPayError,
      onBlur: onBlurHourlyPay,
      unit: '원',
    },
    {
      id: 'startsAt',
      type: 'datetime-local',
      value: startsAt,
      label: '시작 일시*',
      errorMessage: '제대로 된 값을 입력해주세요',
      isError: Boolean(startsAtError),
      onChange: changeStartsAt,
      onFocus: clearStartsAtError,
      onBlur: onBlurStartsAt,
    },
    {
      id: 'workhour',
      type: 'number',
      value: workhour,
      label: '업무 시간*',
      errorMessage: '제대로 된 값을 입력해주세요',
      isError: Boolean(workhourError),
      onChange: changeWorkhour,
      onFocus: clearWorkhourError,
      onBlur: onBlurWorkhour,
      unit: '시간',
    },
  ];

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (hourlyPayError || startsAtError || workhourError) {
      return;
    }
    console.log(shopId);
    const APIFlag = await postNotice(shopId, {
      hourlyPay: Number(hourlyPay.replaceAll(',', '')),
      startsAt: changeDateType(startsAt),
      workhour: Number(workhour),
      description,
    });
    if (APIFlag) {
      alert('등록이 완료되었습니다.');
      router.push('/ownerNoticeDetail');
    }
  };

  useEffect(() => {
    if (noticeData) {
      changeHoulyPay(changeMoneyType(String(noticeData.hourlyPay)));
      const date = new Date(noticeData.startsAt);
      const formattedDate = date.toISOString().slice(0, 16);
      changeWorkhour(String(noticeData.workhour));
      changeStartsAt(formattedDate);
      setDescription(noticeData.description);
    }
  }, [changeHoulyPay, changeWorkhour, changeStartsAt, noticeData]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.contentWrapper}>
        <div className={styles.titleWrapper}>
          <span>{noticeData ? '공고 편집' : '공고 등록'}</span>
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
                    onBlur={data.onBlur}
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
