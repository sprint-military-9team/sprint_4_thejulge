import { ENVELOPE, FACEBOOK, INSTAGRAM } from '@/utils/constants';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Footer.module.scss';

type SNSDataType = {
  name: string;
  src: string;
  href: string;
};

const SNS: SNSDataType[] = [
  {
    name: 'envelop',
    src: ENVELOPE,
    href: '',
  },
  {
    name: 'facebook',
    src: FACEBOOK,
    href: '',
  },
  {
    name: 'instagram',
    src: INSTAGRAM,
    href: '',
  },
];

export default function Footer() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.contentWrapper}>
        <div className={styles.copyLight}>©codeit - 2023</div>
        <div className={styles.privacyWrapper}>
          <div className={styles.privacyButton}>Privacy Policy</div>
          <div className={styles.privacyButton}>FAQ</div>
        </div>
        <div className={styles.snsWrapper}>
          {SNS.map((sns) => (
            <Link key={sns.name} href={sns.href}>
              <Image src={sns.src} alt={sns.name} width={25} height={25} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
