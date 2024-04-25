import { CLOSE } from '@/utils/constants';
import Dropdown from '@/components/common/Dropdown/Dropdown';
import { SEOULGROUPLIST } from '@/constants/SEOUL';
import Input from '@/components/common/Input/Input';
import { FormEvent, useState } from 'react';
import Button from '@/components/common/Button';
import Image from 'next/image';
import { UserProfileType } from '@/types';
import { setUserProfile } from '@/apis/profile';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import styles from './ProfileEdit.module.scss';
import 'react-toastify/dist/ReactToastify.css';

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
  const [name, setName] = useState(defaultValues?.name ? defaultValues.name : '');
  const [phone, setPhone] = useState(defaultValues?.phone ? defaultValues.phone : '');
  const [bio, setBio] = useState(defaultValues?.bio ? defaultValues.bio : '');
  const [address, setAddress] = useState(defaultValues?.address ? defaultValues.address : '');
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  // const [loading, error, setUserProfileAsync, setError] = useAsync(setUserProfile);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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

  const handleSubmit = async (e: FormEvent) => {
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
    if (!address) {
      // eslint-disable-next-line no-alert
      toast.error('주소를 입력해주세요');

      return;
    }

    if (!name || !phone) {
      return;
    }
    const USER_ID = Cookies.get('userId') as string;
    setLoading(true);
    try {
      await setUserProfile(USER_ID, { name, phone, address, bio });
      router.refresh();
      onClose();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // eslint-disable-next-line no-alert
      // 행동만 막으면 되지 굳이 값을 삭제할 필요가 있을까
      if (error.message === '401') {
        toast.error('유저 토큰에 문제가 생겼습니다. 로그아웃 후 다시 로그인 해주세요.');
      } else if (error.message === '403') {
        toast.error('프로필 수정 권한이 없어요. 로그아웃 후 다시 로그인 해주세요.');
      } else if (error.message === '400') {
        toast.error(`${error.message}`);
      } else {
        toast.error('예상치 못한 문제가 발생했습니다. 로그아웃 후 다시 로그인 해주세요.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${styles.container} ${isOpend && styles.opacity}`}>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
        limit={1}
      />
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
                  <span className={`${styles.label} ${styles.addressLabel}`}>주소*</span>
                  <Dropdown optionList={SEOULGROUPLIST} initialOption={address} onClick={setAddress} />
                </div>
              </div>
            </div>
            <div className={styles.textArea}>
              <span className={styles.label}>소개</span>
              <textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} />
            </div>
            <div style={{ width: '31.2rem', margin: '4rem auto' }}>
              <Button submit color="orange" size="medium" isDisabled={loading}>
                등록하기
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
