'use client';

import Input from '@/components/common/Input/Input';
import { useCallback, useState } from 'react';
import Button from '@/components/common/Button';
import useInput from '@/hooks/useInput';
import styles from './form.module.scss';
import MemberButton from '../MemberButton/MemberButton';

export default function Form() {
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
  const [memberType, setMemberType] = useState('employee');

  const onBlurEmail = useCallback(() => {
    const regularExpression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regularExpression.test(email)) {
      changeEmailError('이메일 형식으로 작성해 주세요.');
    }
  }, [changeEmailError, email]);

  const onBlurPassword = useCallback(() => {
    if (password.length < 8) {
      changePasswordError('비밀번호는 8자 이상 작성해 주세요.');
    }
  }, [password, changePasswordError]);

  const onBlurConfirmPassword = useCallback(() => {
    if (confirmPassword !== password) {
      changeConfirmPasswordError('비밀번호가 일치하지 않습니다.');
    }
  }, [changeConfirmPasswordError, confirmPassword, password]);

  const onClickWorkerButton = useCallback(() => {
    setMemberType('employee');
  }, []);

  const onClickOwnerButton = useCallback(() => {
    setMemberType('employer');
  }, []);

  return (
    <form className={styles.loginForm}>
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
        <Button color="orange" size="large">
          가입하기
        </Button>
      </div>
    </form>
  );
}
