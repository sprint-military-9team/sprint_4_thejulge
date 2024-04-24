'use client';

import Button from '@/components/common/Button';
import React, { useState } from 'react';
import { UserProfileType } from '@/types';
import ProfileEdit from './ProfileEdit';

function ControlModal({
  defaultValues,
  type = 'normal',
  buttonContent,
}: {
  defaultValues?: UserProfileType;
  type?: string;
  buttonContent?: string;
}) {
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
      {type === 'banner' ? (
        <Button color="orange" size="medium" style={{ maxWidth: '37rem', margin: '0 auto' }} onClick={handleOpenEdit}>
          {buttonContent}
        </Button>
      ) : (
        <Button onClick={handleOpenEdit} color="white" size="medium" style={{ padding: '1rem 1.4rem' }}>
          편집하기
        </Button>
      )}
    </>
  );
}

export default ControlModal;
