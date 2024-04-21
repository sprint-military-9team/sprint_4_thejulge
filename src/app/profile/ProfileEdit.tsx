import { CLOSE } from '@/utils/constants';
import Dropdown from '@/components/common/Dropdown/Dropdown';
import { SEOULGROUPLIST } from '@/constants/SEOUL';
import Input from '@/components/common/Input/Input';
import { FormEvent, useState } from 'react';
import Button from '@/components/common/Button';
import Image from 'next/image';
import { UserProfileType } from '@/types';
import styles from './ProfileEdit.module.scss';

type ProfileEditProps = {
  isOpend: boolean;
  onClose: () => void;
  defaultValues?: UserProfileType;
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
};

export default function ProfileEdit({ isOpend, onClose, defaultValues }: ProfileEditProps) {
  const [name, setName] = useState(defaultValues ? defaultValues.name : '');
  const [phone, setPhone] = useState(defaultValues ? defaultValues.phone : '');
  const [bio, setBio] = useState(defaultValues ? defaultValues.bio : '');
  const [address, setAddress] = useState(defaultValues ? defaultValues.address : null);
  const [errors, setErrors] = useState(INITIAL_ERRORS);

  const handleCloseClick = () => {
    onClose();
  };

  const handleChangeName = (value: string) => {
    setName(value);
  };

  const handleChangePhone = (value: string) => {
    setPhone(value);
  };

  const handleFocusOutName = () => {
    setErrors((prevErrors) => ({ ...prevErrors, nameError: { isError: false, errorMessage: '' } }));
  };

  const handleFocusOutPhone = () => {
    setErrors((prevErrors) => ({ ...prevErrors, phoneError: { isError: false, errorMessage: '' } }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name) {
      setErrors((prevErrors) => ({ ...prevErrors, nameError: { isError: true, errorMessage: '이름을 입력해주세요' } }));
    }
    if (!phone) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phoneError: { isError: true, errorMessage: '휴대폰 번호를 입력해주세요' },
      }));
    }

    if (!name || !phone) {
      return;
    }
    console.log(name, phone, bio, address);
    console.log('API 연동');
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
                    value={name}
                    onChange={handleChangeName}
                    isError={errors.nameError.isError}
                    errorMessage={errors.nameError.errorMessage}
                    onFocus={handleFocusOutName}
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
                    value={phone}
                    onChange={handleChangePhone}
                    isError={errors.phoneError.isError}
                    errorMessage={errors.phoneError.errorMessage}
                    onFocus={handleFocusOutPhone}
                  />
                </div>
              </div>
              <div className={styles.inputArea}>
                <div className={styles.inputAreaWrapper}>
                  <span className={`${styles.label} ${styles.addressLabel}`}>주소</span>
                  <Dropdown optionList={SEOULGROUPLIST} initialOption={address} onClick={setAddress} />
                </div>
              </div>
            </div>
            <div className={styles.textArea}>
              <span className={styles.label}>소개</span>
              <textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} />
            </div>
            <div style={{ width: '31.2rem', margin: '4rem auto' }}>
              <Button submit color="orange" size="medium">
                등록하기
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
