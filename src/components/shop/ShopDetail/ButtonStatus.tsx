import Button from '@/components/common/Button';

interface ButtonStatusProps {
  status: 'pending' | 'accepted' | 'rejected' | 'canceled' | 'none';
  onClick?: () => void;
}

export default function ButtonStatus({ status, onClick }: ButtonStatusProps) {
  let color: 'white' | 'disabled' | 'orange' | 'blue';
  let children;
  switch (status) {
    case 'pending':
      color = 'white';
      children = '취소 하기';
      break;
    case 'accepted':
      color = 'disabled';
      children = '신청 승인';
      break;
    case 'rejected':
      color = 'disabled';
      children = '신청 거절';
      break;
    case 'canceled':
      color = 'orange';
      children = '신청 하기';
      break;
    default:
      color = 'orange';
      children = '신청 하기';
  }

  return (
    <Button color={color} size="large" onClick={onClick}>
      {children}
    </Button>
  );
}
