import { getUserApplicationData } from '@/apis/application';
import Table from '@/components/common/Table';
import getTimeDifference from '@/utils/getTimeDifference';
import { cookies } from 'next/headers';
import styles from './ProfileTableContainer.module.scss';
import Banner from './Banner';
import Pagination from '../common/PaginationSSR/PaginationSSR';

const LIMIT = 4;

type HeaderType = {
  id: 'name' | 'day' | 'hourlyPay' | 'status';
  name: string;
};

const header: HeaderType[] = [
  { id: 'name', name: '가게' },
  { id: 'day', name: '일자' },
  { id: 'hourlyPay', name: '시급' },
  { id: 'status', name: '상태' },
];

export default async function ProfileTableContainer({ currentPage }: { currentPage: number }) {
  const cookiesStorage = cookies();
  const token = cookiesStorage.get('token').value as string;
  const cookie = cookies().get('userId').value as string;

  const data = await getUserApplicationData(token, cookie, LIMIT, LIMIT * (currentPage - 1));

  const body = data.items.map((application) => {
    const {
      item: {
        id,
        status,
        shop: {
          item: { name },
        },
        notice: {
          item: { hourlyPay, startsAt, workhour },
        },
      },
    } = application;
    return { id, name, day: getTimeDifference(startsAt, Number(workhour)), hourlyPay, status };
  });

  return (
    <div>
      {data.count > 0 ? (
        <section className={styles.applyList}>
          <div className={styles.wrapper}>
            <h2 className={styles.sectionTitle}>신청 내역</h2>
            <div className={styles.tableContainer}>
              <Table header={header} body={body} type="worker" />
              <Pagination currentPage={currentPage} allDataCount={data.count} perPageDataCount={LIMIT} />
            </div>
          </div>
        </section>
      ) : (
        <section className={styles.applyList}>
          <div className={styles.wrapper}>
            <h2 className={styles.sectionTitle}>신청 내역</h2>
            <Banner description="아직 신청 내역이 없어요." buttonContent="공고 보러가기" linkPath="/" isPageChange />
          </div>
        </section>
      )}
    </div>
  );
}
