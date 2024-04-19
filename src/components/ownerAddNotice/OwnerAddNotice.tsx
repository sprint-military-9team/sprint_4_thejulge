'use client';

import Image from 'next/image';
import { CLOSE_ICON } from '@/utils/constants';
import styles from './OwnerAddNotice.module.scss';
import Input from '../common/Input/Input';
import Button from '../common/Button';

export default function OwnerAddNotice() {
  const changeDateType = (date: string) => {
    const inputDate = new Date(date);
    const formattedDate = `${inputDate.toISOString().slice(0, 19)}Z`;
    return formattedDate;
  };

  const handleClickCloseButton = () => {
    console.log('close');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const dom = document.getElementById('date') as HTMLFormElement;
    console.log(changeDateType(dom.value));
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
              <div className={styles.inputComponentWrapper}>
                <Input type="text" id="pay" label="시급" placeholder="" />
              </div>
              <div className={styles.inputComponentWrapper}>
                <Input type="datetime-local" id="date" label="시급" placeholder="" />
              </div>
              <div className={styles.inputComponentWrapper}>
                <Input type="text" id="tay" label="시급" placeholder="테스트" />
              </div>
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
