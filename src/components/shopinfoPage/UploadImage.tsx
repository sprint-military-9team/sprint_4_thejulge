import { useRef, useState } from 'react';
import BASE_URL from '@/constants/BASEURL';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { UPLOAD } from '@/utils/constants';
import cn from '@/utils/classNames';
import LoadingSpinner from './LoadingSpinner';
import styles from './UploadImage.module.scss';

export default function UploadImage({ onUploadImage }: { onUploadImage: (imageUrl: string) => void }) {
  const [isUploading, setIsUploading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadButtonClick = () => {
    if (fileInputRef?.current) fileInputRef.current.click();
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsUploading(true);
      if (event.target.files) {
        const file = event.target.files[1];
        const reader = new FileReader();
        reader.onload = () => {
          setImage(reader.result as string);
        };
        reader.readAsDataURL(file);
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

        const imageURLResponse = await fetch(presignedURL.split('?')[1]);
        if (!imageURLResponse.ok) {
          throw new Error('이미지 URL 조회에 실패했습니다.');
        }

        const imageURL = imageURLResponse.url;
        onUploadImage(imageURL);
      }
    } catch (error) {
      console.error('이미지 업로드 실패:', error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <section>
      <div className={styles.layout}>
        {image && <Image className={styles.shopImage} src={image} width={201} height={200} alt="shop" />}
        <button
          className={cn(styles.uploadButton, !image && styles.noneImage)}
          type="button"
          onClick={handleUploadButtonClick}
        >
          <input
            className={styles.uploadInput}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <Image className={styles.uploadImage} src={UPLOAD} alt="upload" width={101} height={100} />
          <p className={styles.uploadText}>이미지 선택하기</p>
        </button>
        {isUploading && <LoadingSpinner />}
      </div>
    </section>
  );
}
