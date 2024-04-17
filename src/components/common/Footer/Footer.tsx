import { ENVELOPE, FACEBOOK, INSTAGRAM } from '@/utils/constants';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Footer.module.scss';
import { SNSDataType } from './types';

const SNS: SNSDataType[] = [
  {
    name: 'envelop',
    src: ENVELOPE,
    href: 'https://www.google.com',
  },
  {
    name: 'facebook',
    src: FACEBOOK,
    href: 'https://www.facebook.com',
  },
  {
    name: 'instagram',
    src: INSTAGRAM,
    href: 'https://www.instagram.com',
  },
];

export default function Footer() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.contentWrapper}>
        <div className={styles.copyLight}>©codeit - 2023</div>
        <div className={styles.privacyWrapper}>
          <Link href="/policy">
            <div className={styles.privacyButton}>Privacy Policy</div>
          </Link>
          <Link href="/faq">
            <div className={styles.privacyButton}>FAQ</div>
          </Link>
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
