'use client';

import Input from '@/components/common/Input/Input';
import { useCallback, useState } from 'react';
import Button from '@/components/common/Button';
import styles from './form.module.scss';
import MemberButton from '../MemberButton/MemberButton';

export default function Form() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [memberType, setMemberType] = useState('employee');
  const onChangeEmail = useCallback((value: string) => {
    setEmail(value);
  }, []);

  const onChangePassword = useCallback((value: string) => {
    setPassword(value);
  }, []);

  const onChangeConfirmPassword = useCallback((value: string) => {
    setConfirmPassword(value);
  }, []);

  const onFocusEmail = useCallback(() => {
    setEmailError('');
  }, []);
  const onFocusPassword = useCallback(() => {
    setPasswordError('');
  }, []);
  const onFocusConfirmPassword = useCallback(() => {
    setConfirmPasswordError('');
  }, []);

  const onBlurEmail = useCallback(() => {
    const regularExpression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regularExpression.test(email)) {
      setEmailError('이메일 형식으로 작성해 주세요.');
    }
  }, [email]);

  const onBlurPassword = useCallback(() => {
    if (password.length < 8) {
      setPasswordError('비밀번호는 8자 이상 작성해 주세요.');
    }
  }, [password]);

  const onBlurConfirmPassword = useCallback(() => {
    if (confirmPassword !== password) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
    }
  }, [confirmPassword, password]);

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
          onChange={onChangeEmail}
          label="이메일"
          placeholder="입력"
          isError={Boolean(emailError)}
          errorMessage={emailError}
          onFocus={onFocusEmail}
          onBlur={onBlurEmail}
        />
      </div>
      <div>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={onChangePassword}
          label="비밀번호"
          placeholder="입력"
          isError={Boolean(passwordError)}
          errorMessage={passwordError}
          onFocus={onFocusPassword}
          onBlur={onBlurPassword}
        />
      </div>
      <div>
        <Input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={onChangeConfirmPassword}
          label="비밀번호 확인"
          placeholder="입력"
          isError={Boolean(confirmPasswordError)}
          errorMessage={confirmPasswordError}
          onFocus={onFocusConfirmPassword}
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
