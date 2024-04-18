import Table from '@/components/common/Table';

const datas = {
  titles: ['신청자', '소개', '전화번호', '상태'],
  data: [
    ['weoifja09', '김태진', '안녕하세요', '010-3727-4228', 'pending'],
    ['oieoe81', '김우기', '안녕하세요', '010-4987-4228', 'pending'],
  ],
};

export default function Test() {
  return (
    <div>
      <Table datas={datas} />
    </div>
  );
}
