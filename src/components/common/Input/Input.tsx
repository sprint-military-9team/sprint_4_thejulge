import cn from '@/utils/classNames';
import styles from './Input.module.scss';

type InputProps = {
  id: string;
  type: string;
  value: string;
  label?: string;
  placeholder?: string;
  errorMessage?: string;
  isError?: boolean;
  onChange: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
};

export default function Input({
  type,
  placeholder,
  label,
  id,
  value,
  onChange,
  onBlur,
  onFocus,
  errorMessage,
  isError,
}: InputProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };
  const handleFocusOut = () => {
    if (onBlur) {
      onBlur();
    }
  };
  const handleFocusIn = () => {
    if (onFocus) {
      onFocus();
    }
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
          onChange={handleChange}
          onBlur={handleFocusOut}
          onFocus={handleFocusIn}
        />
      </div>
      {isError && <p className={styles.errorMessage}>{errorMessage}</p>}
    </>
  );
}
