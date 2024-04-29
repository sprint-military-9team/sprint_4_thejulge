import { SpecifyNoticeApplicationsDataType } from '@/types';
import ApplicationSlider from './ApplicationSlider';
import Totalcount from './TotalCount';
import LocationChart from './LocationChart';
import StatusChart from './StatusChart';

type ApplicationChartProps = {
  applicationData: {
    count: number;
    items: SpecifyNoticeApplicationsDataType[];
  };
};

export default function ApplicationChart({ applicationData }: ApplicationChartProps) {
  return (
    <ApplicationSlider>
      <Totalcount count={applicationData.count} />
      <LocationChart applicationData={applicationData} />
      <StatusChart applicationData={applicationData} />
    </ApplicationSlider>
  );
}
