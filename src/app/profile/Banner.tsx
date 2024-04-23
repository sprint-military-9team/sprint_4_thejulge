'use client';

import Button from '@/components/common/Button';
import Link from 'next/link';
import styles from './Banner.module.scss';

type BannerProps = {
  description: string;
  buttonContent: string;
  linkPath?: string;
  onClick?: () => void;
};

export default function Banner({ description, buttonContent, linkPath, onClick }: BannerProps) {
  return (
    <div className={styles.banner}>
      <p className={styles.bannerDescription}>{description}</p>
      {onClick ? (
        <div onClick={onClick}>
          <Button color="orange" size="medium" style={{ maxWidth: '37rem', margin: '0 auto' }}>
            {buttonContent}
          </Button>
        </div>
      ) : (
        <Link style={{ textDecoration: 'none' }} href={linkPath || '#'}>
          <Button color="orange" size="medium" style={{ maxWidth: '37rem', margin: '0 auto' }}>
            {buttonContent}
          </Button>
        </Link>
      )}
    </div>
  );
}
