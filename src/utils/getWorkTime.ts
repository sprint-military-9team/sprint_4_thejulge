export default function getWorkTime(startsAt: string, workHour: number) {
  const startTime = new Date(startsAt);
  const endTime = new Date(startTime.getTime() + workHour * 60 * 60 * 1000);
  const startFormat = startTime.toISOString().replace('T', ' ').substring(0, 16);
  const endFormat = endTime.toISOString().replace('T', ' ').substring(11, 16);
  return `${startFormat}~${endFormat} (${workHour}시간)`;
}
