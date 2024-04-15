import Header from './components/common/Header/Header';

export default function Home() {
  const data = [
    {
      id: '1',
      name: 'test1',
      startsAt: '2024-04-16T15:00:00.000Z',
      createdAt: '2024-04-15T15:06:15.633Z',
      result: 'accepted',
      read: false,
    },
    {
      id: '2',
      name: 'test3',
      startsAt: '2024-04-16T15:00:00.000Z',
      createdAt: '2024-04-15T15:06:15.633Z',
      result: 'rejected',
      read: false,
    },
    {
      id: '3',
      name: 'test3',
      startsAt: '2024-04-16T15:00:00.000Z',
      createdAt: '2024-04-15T15:06:15.633Z',
      result: 'rejected',
      read: false,
    },
    {
      id: '4',
      name: 'test3',
      startsAt: '2024-04-16T15:00:00.000Z',
      createdAt: '2024-04-15T15:06:15.633Z',
      result: 'rejected',
      read: false,
    },
  ];
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Header memberType="worker" notificationListData={data} />
    </div>
  );
}
