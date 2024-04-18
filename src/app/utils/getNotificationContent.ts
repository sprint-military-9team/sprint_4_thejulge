import getTimeDifference from './getTimeDifference';

const getNotificationContent = (name: string, startsAt: string, workhour: number) => {
  const date = getTimeDifference(startsAt, workhour);
  return `${name}(${date}) 공고 지원이`;
};

export default getNotificationContent;
