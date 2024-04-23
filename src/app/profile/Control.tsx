'use client';

import Button from '@/components/common/Button';
import React, { useState } from 'react';
import ProfileEdit from './ProfileEdit';

export default function ControlModal({ defaultValues }) {
  const [isOpened, setIsOpend] = useState(false);

  const handleCloseEdit = () => {
    setIsOpend(false);
  };

  const handleOpenEdit = () => {
    setIsOpend(true);
  };

  return (
    <>
      <ProfileEdit defaultValues={defaultValues} isOpend={isOpened} onClose={handleCloseEdit} />
      {/* {React.cloneElement(children, { handleOpenEdit })} */}
      <Button onClick={handleOpenEdit} color="white" size="medium" style={{ padding: '1rem 1.4rem' }}>
        편집하기
      </Button>
    </>
  );
}
