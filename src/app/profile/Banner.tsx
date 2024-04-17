import Button from '@/components/common/Button';
import styles from './Banner.module.scss';

type BannerProps = {
  description: string;
  buttonContent: string;
};

export default function Banner({ description, buttonContent }: BannerProps) {
  return (
    <div className={styles.banner}>
      <p className={styles.bannerDescription}>{description}</p>
      <Button color="orange" size="medium" style={{ width: '37rem', margin: '0 auto' }}>
        {buttonContent}
      </Button>
    </div>
  );
}
