'use client';

import { useEffect, useState } from 'react';
import { ResponsiveContainer, Cell, PieChart, Pie, Sector } from 'recharts';
import { SpecifyNoticeApplicationsDataType } from '@/types';
import styles from './LocationChart.module.scss';

type LocationChartProps = {
  applicationData: {
    count: number;
    items: SpecifyNoticeApplicationsDataType[];
  };
};

type LocationDataType = {
  name: string;
  applications: number;
};

export default function LocationChart({ applicationData }: LocationChartProps) {
  const [currentData, setCurrentData] = useState(-1);
  const [locationData, setLocationData] = useState<LocationDataType[]>([]);

  const customStyle = ({ cx, cy, innerRadius, outerRadius, startAngle, endAngle, midAngle, fill }) => {
    const RADIAN = Math.PI / 180;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 25) * cos;
    const my = cy + (outerRadius + 25) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 15;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
      <g>
        fill
        <text x={cx} y={cy} dy={8} fill="#000" textAnchor="middle" fontSize={11} fontWeight={600}>
          {locationData[currentData].name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill="#999"
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke="#999" fill="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 10} y={ey - 15} dy={18} textAnchor={textAnchor} fill="#999">
          {locationData[currentData].applications}
        </text>
      </g>
    );
  };

  useEffect(() => {
    const locationCount: { [key: string]: number } = {};
    applicationData.items.forEach((data) => {
      const {
        user: {
          item: { address },
        },
      } = data.item;
      if (address in locationCount) {
        Object.assign(locationCount, { [address]: locationCount[address] + 1 });
      } else if (address !== null) {
        Object.assign(locationCount, { [address]: 1 });
      }
    });
    const data = Object.keys(locationCount).map((location) => ({
      name: location,
      applications: locationCount[location],
    }));
    setLocationData(data);
  }, [applicationData]);

  const onPieEnter = (_, index) => {
    setCurrentData(index);
  };

  const onPieLeave = () => {
    setCurrentData(-1);
  };

  const COLOORS_PIE = {
    '서울시 종로구': '#FFA8B8',
    '서울시 중구': '#FFD1AA',
    '서울시 용산구': '#FEE8B6',
    '서울시 성동구': '#FFFAAC',
    '서울시 광진구': '#C4F4A6',
    '서울시 동대문구': '#B0FFCC',
    '서울시 중랑구': '#B3FFDB',
    '서울시 성북구': '#A9D8F5',
    '서울시 강북구': '#D4C4FF',
    '서울시 도봉구': '#E0B9E4',
    '서울시 노원구': '#C3E0FF',
    '서울시 은평구': '#FFD4E1',
    '서울시 서대문구': '#FFD4F5',
    '서울시 마포구': '#FFE3A5',
    '서울시 양천구': '#FFD4A5',
    '서울시 강서구': '#FBFFC3',
    '서울시 구로구': '#D8FFC3',
    '서울시 금천구': '#C3FFC5',
    '서울시 영등포구': '#C3FFE7',
    '서울시 동작구': '#C3FFFF',
    '서울시 관악구': '#C3E5FF',
    '서울시 서초구': '#C3C3FF',
    '서울시 강남구': '#D4C3FF',
    '서울시 송파구': '#FFC3D8',
    '서울시 강동구': '#FFE4C3',
  };

  return (
    <div className={styles.wrapper}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={200} height={200}>
          <Pie
            dataKey="applications"
            data={locationData}
            innerRadius={50}
            outerRadius={80}
            cx="50%"
            cy="50%"
            activeIndex={currentData}
            activeShape={customStyle}
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
          >
            {locationData.map((data) => (
              <Cell key={data.name} fill={COLOORS_PIE[data.name]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
