'use client';

import Input from '@/components/common/Input/Input';
import { useCallback, useRef } from 'react';
import Button from '@/components/common/Button';
import useInput from '@/hooks/useInput';
import { checkEmail, checkInputList, checkPassword } from '@/utils/checkLoginInput';
import styles from './form.module.scss';

export default function Form() {
  const formRef = useRef<HTMLFormElement>(null);
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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    checkInputList(formRef);
    if (checkEmail(email) && checkPassword(password)) {
      console.log('api');
    }
  };

  return (
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
  );
}
