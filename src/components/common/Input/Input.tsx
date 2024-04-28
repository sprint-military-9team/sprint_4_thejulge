import cn from '@/utils/classNames';
import styles from './Input.module.scss';

type InputProps = {
  id: string;
  type: string;
  value: string;
  label?: string;
  placeholder?: string;
  unit?: string;
  isError?: boolean;
  errorMessage?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
};

export default function Input({
  id,
  type,
  value,
  label,
  placeholder,
  unit,
  isError,
  errorMessage,
  onChange,
  onBlur,
  onFocus,
}: InputProps) {
  const UINT_LENGTH: { [key: number]: string } = {
    1: styles.singleCharacterUnit,
    2: styles.doubleCharacterUnit,
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        <div className={styles.inputWrapper}>
          {type === 'textArea' ? (
            <textarea className={styles.input} value={value} onChange={handleChange} rows={4} />
          ) : (
            <input
              id={id}
              name={id}
              className={cn(styles.input, isError && styles.error, unit && UINT_LENGTH[unit.length])}
              value={value}
              placeholder={placeholder}
              type={type}
              onChange={handleChange}
              onBlur={handleFocusOut}
              onFocus={handleFocusIn}
              autoComplete="off"
            />
          )}
          {unit && <p className={styles.unit}>{unit}</p>}
        </div>
      </div>
      <p className={cn(styles.errorMessage, !isError && styles.messageHidden)}>{errorMessage}</p>
    </>
  );
}
