import { LOGO_BIG } from '@/utils/constants';
import Image from 'next/image';
import Form from '@/components/signin/form/Form';
import Link from 'next/link';
import RedirectToast from '@/components/common/RedirectToast/RedirectToast';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import styles from './page.module.scss';

export default function signin() {
  const token = cookies().get('token');
  if (token) {
    redirect('/?redirectStatus=alreadyLogin');
  }
  return (
    <>
      <RedirectToast />
      <div className={styles.page}>
        <div className={styles.wrapper}>
          <Link href="/" className={styles.logoWrapper}>
            <Image src={LOGO_BIG} alt="logo" width={248} height={45} priority className={styles.logo} />
          </Link>
          <Form />
          <div className={styles.text}>
            회원이 아니신가요? <Link href="/signup">회원가입하기</Link>
          </div>
        </div>
      </div>
    </>
  );
}
