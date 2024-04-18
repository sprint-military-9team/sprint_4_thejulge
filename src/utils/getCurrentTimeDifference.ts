const getCurrentTimeDifference = (createdAt: string) => {
  const date = new Date(createdAt);
  const currentDate = new Date();
  const timeDifference = Math.floor((currentDate.getTime() - date.getTime()) / 1000);
  const minute = Math.floor(timeDifference / 60);
  if (!minute || minute < 0) {
    return 'InvalidTime';
  }
  if (minute < 60) {
    return `${minute}분 전`;
  }
  if (minute < 60 * 24) {
    const hour = Math.floor(minute / 60);
    return `${hour}시간 전`;
  }
  if (minute < 60 * 24 * 30) {
    const day = Math.floor(minute / (60 * 24));
    return `${day}일 전`;
  }
  if (minute < 60 * 24 * 30 * 12) {
    const month = Math.floor(minute / (60 * 24 * 30));
    return `${month}달 전`;
  }
  const year = Math.floor(minute / (60 * 24 * 30 * 12));
  return `${year}년 전`;
};

export default getCurrentTimeDifference;
