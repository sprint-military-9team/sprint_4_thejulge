export const checkEmail = (value: string) => {
  const regularExpression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (regularExpression.test(value)) {
    return true;
  }
  return false;
};

export const checkPassword = (value: string) => {
  if (value.length >= 8) {
    return true;
  }
  return false;
};

export const checkConfirmPassword = (password: string, confirmPassword: string) => {
  if (password === confirmPassword) {
    return true;
  }
  return false;
};

export const checkInputList = (formRef: React.RefObject<HTMLFormElement>) => {
  const inputList = formRef.current?.querySelectorAll('input');
  inputList?.forEach((input) => {
    input.focus();
    input.blur();
  });
};
