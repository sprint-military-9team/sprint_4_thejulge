import Table from '@/components/common/Table';
import Pagination from '@/components/common/PaginationSSR/PaginationSSR';
import { getSpecifyNoticeApplicationData } from '@/apis/application';
import styles from './ApplicationList.module.scss';

type HeaderType = {
  id: 'id' | 'name' | 'bio' | 'phone' | 'status';
  name: string;
};

type BodyType = {
  id: string;
  name: string | undefined;
  bio: string | undefined;
  phone: string | undefined;
  status: 'pending' | 'rejected' | 'accepted' | 'canceled';
};

type TableData = {
  header: HeaderType[];
  body: BodyType[];
};

type ApplicationListProps = {
  shopId: string;
  noticeId: string;
  currentPage: string;
};

export default async function ApplicationList({ shopId, noticeId, currentPage }: ApplicationListProps) {
  const applicationData = await getSpecifyNoticeApplicationData(
    shopId,
    noticeId,
    7 * (Number(currentPage) - 1),
    7 * Number(currentPage),
  );
  const totalCount = applicationData.count;
  const body = applicationData.items.map((application) => {
    const {
      item: {
        id,
        status,
        user: {
          item: { name, phone, bio },
        },
      },
    } = application;
    return { id, name, bio, phone, status };
  });
  const tableData: TableData = {
    header: [
      { id: 'name', name: '신청자' },
      { id: 'bio', name: '소개' },
      { id: 'phone', name: '전화번호' },
      { id: 'status', name: '상태' },
    ],
    body,
  };

  return (
    <div className={styles.section}>
      <div className={styles.wrapper}>
        <div className={styles.title}>신청자 목록</div>
        <div>
          <Table header={tableData.header} body={tableData.body} type="owner" />
          <Pagination
            currentPage={Number(currentPage)}
            allDataCount={totalCount}
            perPageDataCount={7}
            pageQuery={`?noticeId=${noticeId}`}
          />
        </div>
      </div>
    </div>
  );
}
