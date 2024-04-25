import { useRef, useState } from 'react';
import BASE_URL from '@/constants/BASEURL';
import Cookies from 'js-cookie';
import Button from '../common/Button';
import LoadingSpinner from './LoadingSpinner';

export default function UploadImage({ token, onUploadImage }) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadButtonClick = () => {
    if (fileInputRef?.current) fileInputRef.current.click();
  };

  const handleImageChange = async (event) => {
    try {
      setIsUploading(true);
      const file = event.target.files[0];

      // 1. Presigned URL 요청
      const presignedURLResponse = await fetch(`${BASE_URL}/images`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
        body: JSON.stringify({ name: file.name }),
      });

      if (!presignedURLResponse.ok) {
        throw new Error('Presigned URL을 받아오는데 실패했습니다.');
      }

      const data = await presignedURLResponse.json();
      const presignedURL = data.item.url;

      const uploadResponse = await fetch(presignedURL, {
        method: 'PUT',
        body: file,
      });

      if (!uploadResponse.ok) {
        throw new Error('이미지를 업로드하는데 실패했습니다.');
      }

      const imageURLResponse = await fetch(presignedURL.split('?')[0]); // query parameters 제외
      if (!imageURLResponse.ok) {
        throw new Error('이미지 URL 조회에 실패했습니다.');
      }

      const imageURL = imageURLResponse.url;
      onUploadImage(imageURL);
    } catch (error) {
      console.error('이미지 업로드 실패:', error.message);
      // 오류 처리
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <Button color="orange" size="large" onClick={handleUploadButtonClick}>
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleImageChange}
        />
        이미지 추가하기
      </Button>
      {isUploading && <LoadingSpinner />}
    </div>
  );
}
