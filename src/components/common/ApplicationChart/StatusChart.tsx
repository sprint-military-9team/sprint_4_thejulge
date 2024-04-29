'use client';

import { BarChart, Bar, YAxis, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { SpecifyNoticeApplicationsDataType } from '@/types';
import { useEffect, useState } from 'react';
import styles from './StatusChart.module.scss';

type StatusChartProps = {
  applicationData: {
    count: number;
    items: SpecifyNoticeApplicationsDataType[];
  };
};

type StatusDataType = {
  name: string;
  applications: number;
};

export default function StatusChart({ applicationData }: StatusChartProps) {
  const COLORS_BAR = {
    대기: '#0088FE',
    거절: '#FFBB28',
  };

  const [statusData, setStatusData] = useState<StatusDataType[]>([]);

  useEffect(() => {
    const statusCount: { [key: string]: number } = {};
    applicationData.items.forEach((data) => {
      const { status } = data.item;
      if (status in statusCount) {
        Object.assign(statusCount, { [status]: statusCount[status] + 1 });
      } else {
        Object.assign(statusCount, { [status]: 1 });
      }
    });
    const data = Object.keys(statusCount).map((status) => ({
      name: status === 'pending' ? '대기' : '거절',
      applications: statusCount[status],
    }));
    setStatusData(data);
  }, [applicationData]);

  return (
    <div className={styles.wrapper}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart layout="vertical" data={statusData} width={270} height={100} barSize={20}>
          <YAxis dataKey="name" type="category" tickLine={false} interval={0} />
          <YAxis
            dataKey="applications"
            type="category"
            yAxisId="right"
            orientation="right"
            tickLine={false}
            axisLine={false}
            interval={0}
          />
          <XAxis dataKey="applications" scale="auto" type="number" hide />
          <Tooltip cursor={false} />
          <Bar dataKey="applications" barSize={6} background={{ fill: '#f3f3f3' }} radius={[10, 10, 10, 10]}>
            {statusData.map((data) => (
              <Cell key={data.name} fill={COLORS_BAR[data.name]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
