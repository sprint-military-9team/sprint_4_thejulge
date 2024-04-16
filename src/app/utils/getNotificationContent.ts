const getDate = (startsAt: string, workhour: number) => {
  const startDate = new Date(startsAt);
  const localStartDate = new Date(startDate.getTime() - 9 * 60 * 60000);
  const localEndDate = new Date(localStartDate.getTime() + 60000 * workhour * 60);

  const starYear = localStartDate.getFullYear();
  const startMonth = String(localStartDate.getMonth() + 1).padStart(2, '0');
  const startDay = String(localStartDate.getDate()).padStart(2, '0');
  const startHour = String(localStartDate.getHours()).padStart(2, '0');
  const startMinute = String(localStartDate.getMinutes()).padStart(2, '0');

  const endYear = localEndDate.getFullYear();
  const endMonth = String(localEndDate.getMonth() + 1).padStart(2, '0');
  const endDay = String(localEndDate.getDate()).padStart(2, '0');
  const endHour = String(localEndDate.getHours()).padStart(2, '0');
  const endMinute = String(localEndDate.getMinutes()).padStart(2, '0');
  const endFormattedDate = `${endYear}.${endMonth}.${endDay} ${endHour}:${endMinute}`;
  const formattedDate = `${starYear}.${startMonth}.${startDay} ${startHour}:${startMinute}`;
  if (endDay !== startDay) {
    return `${formattedDate}~${endFormattedDate}`;
  }
  return `${formattedDate}~${endHour}:${endMinute}`;
};

const getNotificationContent = (name: string, startsAt: string, workhour: number) => {
  const date = getDate(startsAt, workhour);
  return `${name}(${date}) 공고 지원이`;
};

export default getNotificationContent;
