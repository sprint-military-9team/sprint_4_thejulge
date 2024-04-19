import { useEffect, useState } from 'react';
import cn from '@/utils/classNames';
import styles from './Input.module.scss';

type InputProps = {
  type: string;
  id?: string;
  label?: string;
  placeholder?: string;
  errorMessage?: string;
  isError?: boolean;
  onBlur?: () => void;
};

const regex = /^[0-9\b -]{0,13}$/;
export default function Input({ type, placeholder, label, id, onBlur, errorMessage, isError }: InputProps) {
  const [value, setValue] = useState('');
  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (id === 'phone') {
      if (regex.test(event.target.value)) {
        setValue(event.target.value);
      }
    } else {
      setValue(event.target.value);
    }
  };
  const handleFocusOut = () => {
    if (onBlur) onBlur();
  };

  useEffect(() => {
    if (value.length === 10) {
      setValue(value.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
    }
    if (value.length === 13) {
      setValue(value.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
    }
  }, [value]);

  return (
    <>
      <div className={styles.layout}>
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          name={id}
          className={cn(styles.input, isError && styles.error)}
          value={value}
          placeholder={placeholder}
          type={type}
          onChange={handleChangeValue}
          onBlur={handleFocusOut}
        />
      </div>
      {isError && <p className={styles.errorMessage}>{errorMessage}</p>}
    </>
  );
}
