import { useState } from 'react';
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

export default function Input({ type, placeholder, label, id, onBlur, errorMessage, isError }: InputProps) {
  const [value, setValue] = useState('');
  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const handleFocusOut = () => {
    if (onBlur) onBlur();
  };

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
