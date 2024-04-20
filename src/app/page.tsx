'use client';

import Header from '@/components/common/Header/Header';
import Input from '@/components/common/Input/Input';
import { useCallback, useState } from 'react';

export default function Home() {
  const HEADER_DATA = [
    {
      id: '1',
      name: 'test1',
      startsAt: '2024-04-16T15:00:00.000Z',
      createdAt: '2024-04-15T15:06:15.633Z',
      workhour: 3,
      result: 'accepted',
      read: false,
    },
    {
      id: '2',
      name: 'test2',
      startsAt: '2024-04-16T15:00:00.000Z',
      createdAt: '2024-04-12T15:06:15.633Z',
      workhour: 6,
      result: 'rejected',
      read: false,
    },
    {
      id: '3',
      name: 'test3',
      startsAt: '2024-04-16T15:00:00.000Z',
      createdAt: '2024-03-19T15:06:15.633Z',
      workhour: 12,
      result: 'rejected',
      read: false,
    },
    {
      id: '4',
      name: 'test4',
      startsAt: '2024-04-16T15:00:00.000Z',
      createdAt: '2023-03-15T15:06:15.633Z',
      workhour: 4,
      result: 'rejected',
      read: false,
    },
    {
      id: '5',
      name: 'test5',
      startsAt: '2024-04-16T15:00:00.000Z',
      createdAt: '2024-04-16T15:06:15.633Z',
      workhour: 4,
      result: 'rejected',
      read: false,
    },
  ];
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const onChange = useCallback((inputValue: string) => {
    setValue(inputValue);
  }, []);
  const onBlur = useCallback(() => {
    if (!value) {
      setError(true);
    } else {
      setError(false);
    }
  }, [value]);

  const [value2, setValue2] = useState('');
  const onChange2 = useCallback((inputValue: string) => {
    setValue2(inputValue);
  }, []);
  return (
    <>
      <Header memberType="owner" notificationListData={HEADER_DATA} />
      <div style={{ width: '300px' }}>
        <Input
          id="test "
          type="text"
          value={value}
          onChange={onChange}
          isError={error}
          errorMessage="알알알아"
          onBlur={onBlur}
          label="테스트"
        />
      </div>
      <div style={{ width: '300px' }}>
        <Input id="test2" type="text" value={value2} onChange={onChange2} label="테스트2" />
      </div>
    </>
  );
}
