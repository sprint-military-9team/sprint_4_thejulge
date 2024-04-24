import { LOGO_BIG } from '@/utils/constants';
import Image from 'next/image';
import Form from '@/components/signup/form/Form';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import styles from './page.module.scss';

export default function signup() {
  const token = cookies().get('token');
  if (token) {
    redirect('/?redirectStatus=alreadyLogin');
  }
  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <Link href="/" className={styles.logoWrapper}>
          <Image src={LOGO_BIG} alt="logo" width={248} height={45} priority className={styles.logo} />
        </Link>
        <Form />
        <div className={styles.text}>
          이미 가입하셨나요? <Link href="/signin">로그인하기</Link>
        </div>
      </div>
    </div>
  );
}
