import React from 'react';
import styles from './button.module.scss';

interface ButtonProps {
  children: React.ReactNode;
  color: 'orange' | 'white' | 'disabled' | 'blue';
  size: 'small' | 'medium' | 'large';
}

function Button({ children, color, size }: ButtonProps) {
  const classProp = styles[color];
  const sizeClass = styles[size];
  return <div className={`${styles.buttonWrapper} ${sizeClass} ${classProp}`}>{children}</div>;
}

export default Button;
