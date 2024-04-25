import Header from '@/components/common/Header/Header';
import RedirectToast from '@/components/common/RedirectToast/RedirectToast';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <RedirectToast />
      <Header />
      <Link href="/map">지도로 찾기</Link>
    </>
  );
}
