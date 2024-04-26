import React from 'react';
import styles from './button.module.scss';

interface ButtonProps {
  children: React.ReactNode;
  color: 'orange' | 'white' | 'disabled' | 'blue';
  size: 'small' | 'medium' | 'large';
  style?: React.CSSProperties;
  submit?: boolean;
  onClick?: () => void;
  isDisabled?: boolean;
}

function Button({ children, color, size, style, submit, onClick, isDisabled }: ButtonProps) {
  const classProp = styles[color];
  const sizeClass = styles[size];
  return (
    <div className={styles.layout}>
      <button
        type={submit ? 'submit' : 'button'}
        onClick={onClick}
        style={style}
        className={`${styles.buttonWrapper} ${sizeClass} ${classProp}`}
        disabled={isDisabled}
      >
        {children}
      </button>
    </div>
  );
}

export default Button;
