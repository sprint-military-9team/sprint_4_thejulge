'use client';

import Input from '@/components/common/Input/Input';
import { useCallback, useRef, useState, useEffect } from 'react';
import Button from '@/components/common/Button';
import useInput from '@/hooks/useInput';
import { checkEmail, checkInputList, checkPassword } from '@/utils/checkLoginInput';
import { postSignin } from '@/apis/user';
import Modal from '@/components/common/Modal/Modal';
import LoginModal from '@/components/common/Modal/LoginModal/LoginModal';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import styles from './form.module.scss';

type LoginModalDataType = {
  type: 'none' | 'signinError' | 'duplicatedEmailError' | 'signupAccepted' | 'error';
  onClose: () => void;
};

export default function Form() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [showModal, setShowModal] = useState<LoginModalDataType>({ type: 'none', onClose: () => {} });
  const {
    value: email,
    error: emailError,
    changeValue: changeEmail,
    changeError: changeEmailError,
    clearError: clearEmailError,
  } = useInput();
  const {
    value: password,
    error: passwordError,
    changeValue: changePassword,
    changeError: changePasswordError,
    clearError: clearPasswordError,
  } = useInput();

  const onClose = useCallback(() => {
    setShowModal({ type: 'none', onClose: () => {} });
  }, []);

  const onBlurEmail = useCallback(() => {
    if (!checkEmail(email)) {
      changeEmailError('이메일 형식으로 작성해 주세요.');
    }
  }, [email, changeEmailError]);

  const onBlurPassword = useCallback(() => {
    if (!checkPassword(password)) {
      changePasswordError('비밀번호는 8자 이상 작성해 주세요.');
    }
  }, [password, changePasswordError]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    checkInputList(formRef);
    if (checkEmail(email) && checkPassword(password)) {
      const data = await postSignin(email, password);
      if (data.error === '404') {
        setShowModal({ type: 'signinError', onClose });
        return;
      }
      router.push('/');
    }
  };

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      router.back();
    }
  }, [router]);

  return (
    <>
      <form className={styles.loginForm} onSubmit={handleSubmit} ref={formRef}>
        <div>
          <Input
            id="email"
            type="text"
            value={email}
            onChange={changeEmail}
            label="이메일"
            placeholder="입력"
            isError={Boolean(emailError)}
            errorMessage={emailError}
            onFocus={clearEmailError}
            onBlur={onBlurEmail}
          />
        </div>
        <div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={changePassword}
            label="비밀번호"
            placeholder="입력"
            isError={Boolean(passwordError)}
            errorMessage={passwordError}
            onFocus={clearPasswordError}
            onBlur={onBlurPassword}
          />
        </div>

        <Button color="orange" size="large" submit>
          로그인
        </Button>
      </form>
      {showModal.type !== 'none' && (
        <Modal>
          <LoginModal type={showModal.type} onClose={onClose} />
        </Modal>
      )}
    </>
  );
}
