'use client';

import Input from '@/components/common/Input/Input';
import { useCallback, useRef, useState } from 'react';
import Button from '@/components/common/Button';
import useInput from '@/hooks/useInput';
import { checkEmail, checkPassword, checkConfirmPassword, checkInputList } from '@/utils/checkLoginInput';
import { postSignin, postSignup } from '@/apis/user';
import LoginModal from '@/components/common/Modal/LoginModal/LoginModal';
import Modal from '@/components/common/Modal/Modal';
import { useRouter } from 'next/navigation';
import styles from './form.module.scss';
import MemberButton from '../MemberButton/MemberButton';

type LoginModalDataType = {
  type: 'none' | 'signinError' | 'duplicatedEmailError' | 'signupAccepted' | 'error';
  onClose: () => void;
};

export default function Form() {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
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
  const {
    value: confirmPassword,
    error: confirmPasswordError,
    changeValue: changeConfirmPassword,
    changeError: changeConfirmPasswordError,
    clearError: clearConfirmPasswordError,
  } = useInput();
  const [memberType, setMemberType] = useState<'employee' | 'employer'>('employee');
  const [showModal, setShowModal] = useState<LoginModalDataType>({
    type: 'none',
    onClose: () => {},
  });

  const onClose = useCallback(() => {
    const flag = Boolean(showModal.type === 'signupAccepted');
    setShowModal({ type: 'none', onClose: () => {} });
    if (flag) {
      router.push('/');
      router.refresh();
    }
  }, [router, showModal]);

  const onBlurEmail = useCallback(() => {
    if (!checkEmail(email)) {
      changeEmailError('이메일 형식으로 작성해 주세요.');
    }
  }, [changeEmailError, email]);

  const onBlurPassword = useCallback(() => {
    if (!checkPassword(password)) {
      changePasswordError('비밀번호는 8자 이상 작성해 주세요.');
    }
  }, [password, changePasswordError]);

  const onBlurConfirmPassword = useCallback(() => {
    if (!checkConfirmPassword(password, confirmPassword)) {
      changeConfirmPasswordError('비밀번호가 일치하지 않습니다.');
    }
  }, [changeConfirmPasswordError, confirmPassword, password]);

  const onClickWorkerButton = useCallback(() => {
    setMemberType('employee');
  }, []);

  const onClickOwnerButton = useCallback(() => {
    setMemberType('employer');
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    checkInputList(formRef);
    if (checkEmail(email) && checkPassword(password) && checkConfirmPassword(password, confirmPassword)) {
      const { error } = await postSignup(email, password, memberType);
      if (!error) {
        const { error: signinError } = await postSignin(email, password);
        if (signinError) {
          return;
        }
        setShowModal({ type: 'signupAccepted', onClose });
        return;
      }
      if (error === '409') {
        changeEmailError('이미 사용중인 이메일입니다.');
        setShowModal({ type: 'duplicatedEmailError', onClose });
        return;
      }
      setShowModal({ type: 'error', onClose });
    }
  };

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
        <div>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={changeConfirmPassword}
            label="비밀번호 확인"
            placeholder="입력"
            isError={Boolean(confirmPasswordError)}
            errorMessage={confirmPasswordError}
            onFocus={clearConfirmPasswordError}
            onBlur={onBlurConfirmPassword}
          />
        </div>
        <div className={styles.memberTypeWrapper}>
          <p className={styles.label}>회원 유형</p>
          <div className={styles.buttonWrapper}>
            <MemberButton isChecked={memberType === 'employee'} onClick={onClickWorkerButton}>
              알바님
            </MemberButton>
            <MemberButton isChecked={memberType === 'employer'} onClick={onClickOwnerButton}>
              사장님
            </MemberButton>
          </div>
        </div>
        <div className={styles.submitWrapper}>
          <Button color="orange" size="large" submit>
            가입하기
          </Button>
        </div>
      </form>
      {showModal.type !== 'none' && (
        <Modal>
          <LoginModal type={showModal.type} onClose={onClose} />
        </Modal>
      )}
    </>
  );
}
