import { useCallback, useState } from 'react';

type DataType = {
  value: string;
  error: string;
};

const useInput = () => {
  const [value, setValue] = useState<DataType>({ value: '', error: '' });

  const changeValue = useCallback((inputValue: string) => {
    setValue((data) => ({ ...data, value: inputValue }));
  }, []);

  const changeError = useCallback((errorValue: string) => {
    setValue((data) => ({ ...data, error: errorValue }));
  }, []);

  const clearError = useCallback(() => {
    setValue((data) => ({ ...data, error: '' }));
  }, []);

  return { value: value.value, error: value.error, changeValue, changeError, clearError };
};

export default useInput;
