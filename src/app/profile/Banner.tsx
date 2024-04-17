import Button from '@/components/common/Button';
import Link from 'next/link';
import styles from './Banner.module.scss';

type BannerProps = {
  description: string;
  buttonContent: string;
  linkPath: string;
};

export default function Banner({ description, buttonContent, linkPath }: BannerProps) {
  return (
    <div className={styles.banner}>
      <p className={styles.bannerDescription}>{description}</p>
      <Link style={{ textDecoration: 'none' }} href={linkPath}>
        <Button color="orange" size="medium" style={{ maxWidth: '37rem', margin: '0 auto' }}>
          {buttonContent}
        </Button>
      </Link>
    </div>
  );
}
