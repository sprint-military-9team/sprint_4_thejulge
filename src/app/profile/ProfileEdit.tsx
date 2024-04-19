import { CLOSE } from '@/utils/constants';
import Dropdown from '@/components/common/Dropdown/Dropdown';
import { SEOULGROUPLIST } from '@/constants/SEOUL';
import Input from '@/components/common/Input/Input';
import { FormEvent, useState } from 'react';
import Button from '@/components/common/Button';
import Image from 'next/image';
import styles from './ProfileEdit.module.scss';

type ProfileEditProps = {
  isOpend: boolean;
  onClose: () => void;
};

const INITIAL_ERRORS = {
  nameError: {
    isError: false,
    errorMessage: '',
  },
  phoneError: {
    isError: false,
    errorMessage: '',
  },
  regionError: {
    isError: false,
    errorMessage: '',
  },
};

type HandleErrorsArgumentType = {
  id: 'name' | 'phone' | 'region';
  type: keyof typeof INITIAL_ERRORS;
  message: string;
};

export default function ProfileEdit({ isOpend, onClose }: ProfileEditProps) {
  const [errors, setErrors] = useState(INITIAL_ERRORS);

  const handleCloseClick = () => {
    onClose();
  };

  const hasError = ({ id, type, message }: HandleErrorsArgumentType) => {
    if ((document.getElementById(id) as HTMLInputElement)?.value === '') {
      setErrors((prevErrors) => ({ ...prevErrors, [type]: { isError: true, errorMessage: message } }));
      return true;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [type]: { isError: false, errorMessage: '' } }));
      return false;
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (
      hasError({ id: 'name', type: 'nameError', message: '이름을 입력해주세요.' }) ||
      hasError({ id: 'phone', type: 'phoneError', message: '핸드폰 번호를 입력해주세요.' })
    ) {
      return;
    }
    console.log('form submitted');
  };

  return (
    <div className={`${styles.container} ${isOpend && styles.opacity}`}>
      <div className={styles.wrapper}>
        <div className={styles.contents}>
          <div className={styles.header}>
            <h2 className={styles.title}>내 프로필</h2>
            <button type="button" className={styles.button} onClick={handleCloseClick}>
              <Image width={30} height={30} src={CLOSE} alt="close" />
            </button>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputListArea}>
              <div className={styles.inputArea}>
                <div className={styles.inputAreaWrapper}>
                  <Input
                    type="text"
                    placeholder="입력"
                    label="이름*"
                    id="name"
                    isError={errors.nameError.isError}
                    errorMessage={errors.nameError.errorMessage}
                  />
                </div>
              </div>
              <div className={styles.inputArea}>
                <div className={styles.inputAreaWrapper}>
                  <Input
                    type="text"
                    placeholder="입력"
                    label="연락처*"
                    id="phone"
                    isError={errors.phoneError.isError}
                    errorMessage={errors.phoneError.errorMessage}
                  />
                </div>
              </div>
              <div className={styles.inputArea}>
                <div className={styles.inputAreaWrapper}>
                  <span className={`${styles.label} ${styles.addressLabel}`}>주소</span>
                  <Dropdown optionList={SEOULGROUPLIST} initialOption={null} />
                </div>
              </div>
            </div>
            <div className={styles.textArea}>
              <span className={styles.label}>소개</span>
              <textarea id="bio" />
            </div>

            <button type="submit" style={{ border: 'none', width: '30rem', margin: '3rem auto 0', display: 'block' }}>
              <Button color="orange" size="medium">
                등록하기
              </Button>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
