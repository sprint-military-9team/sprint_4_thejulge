'use client';

import Button from '@/components/common/Button';
import Link from 'next/link';
import styles from './Banner.module.scss';
import ControlModal from './Control';

type BannerProps = {
  description: string;
  buttonContent: string;
  linkPath?: string;
  isPageChange: boolean;
};

export default function Banner({ description, buttonContent, linkPath, isPageChange }: BannerProps) {
  return (
    <div className={styles.banner}>
      <p className={styles.bannerDescription}>{description}</p>
      {!isPageChange ? (
        <ControlModal type="banner" buttonContent={buttonContent} />
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
