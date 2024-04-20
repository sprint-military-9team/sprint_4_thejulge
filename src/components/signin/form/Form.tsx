'use client';

import Input from '@/components/common/Input/Input';
import { useCallback, useState } from 'react';
import Button from '@/components/common/Button';
import styles from './form.module.scss';

export default function Form() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const onChangeEmail = useCallback((value: string) => {
    setEmail(value);
  }, []);

  const onChangePassword = useCallback((value: string) => {
    setPassword(value);
  }, []);

  const onFocusEmail = useCallback(() => {
    setEmailError('');
  }, []);
  const onFocusPassword = useCallback(() => {
    setPasswordError('');
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

      <Button color="orange" size="large">
        로그인
      </Button>
    </form>
  );
}
