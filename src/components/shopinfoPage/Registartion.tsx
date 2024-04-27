import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { SEOULGROUPLIST } from '@/constants/SEOUL';
import FOOD_CATEGORIES from '@/constants/SHOP';
import { CLOSE_ICON } from '@/utils/constants';
import BASE_URL from '@/constants/BASEURL';
import Cookies from 'js-cookie';
import { ShopDataContext } from '@/context/ShopDataContext';
import { useRouter } from 'next/navigation';
import Dropdown from '../common/Dropdown/Dropdown';
import Input from '../common/Input/Input';
import styles from './Registartion.module.scss';
import UploadImage from './UploadImage';
import Button from '../common/Button';
import CompletionModal from '../common/Modal/CompletionModal/completionModal';
import { FormData } from './type';

export default function Registration({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const shopId = Cookies.get('shopId');
  const token = Cookies.get('token');
  const { shopData, updateShopData } = useContext(ShopDataContext);
  const [inputValue, setInputValue] = useState<FormData>({
    name: '',
    category: '',
    address1: '',
    address2: '',
    imageUrl: '',
    description: '',
    originalHourlyPay: 0,
  });

  const onUploadImage = (imageUrl: string) => {
    setInputValue((prevState: FormData) => ({
      ...prevState,
      imageUrl,
    }));
  };

  const onValueChange = (field: string, value: string) => {
    setInputValue((prevState: FormData) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleCompletionModalClick = () => {
    setShowModal(false);
    onClose();
    router.refresh();
  };

  const handleButtonClick = async () => {
    const response = await fetch(`${BASE_URL}/shops${shopData?.id && `/${shopId}`}`, {
      method: shopData?.id ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(inputValue),
    });
    const data = await response.json();
    Cookies.set('shopId', data.item.id);
    setShowModal(true);
    if (shopData?.id) {
      updateShopData(data.item);
    }
  };

  useEffect(() => {
    if (shopData?.id) {
      const { name, category, address1, address2, imageUrl, description, originalHourlyPay } = shopData;
      setInputValue({ name, category, address1, address2, imageUrl, description, originalHourlyPay });
    }
  }, [shopId]);

  return (
    <div className={styles.layout}>
      <section className={styles.Box}>
        <div className={styles.titleBox}>
          <h2>가게 정보</h2>
          <Image className={styles.closeIcon} src={CLOSE_ICON} alt="close" width={35} height={35} onClick={onClose} />
        </div>
        <form className={styles.form}>
          <div className={styles.name}>
            <Input
              type="text"
              label=" 가게 이름*"
              id="name"
              value={inputValue.name}
              onChange={(value) => onValueChange('name', value)}
            />
          </div>
          <div className={styles.category}>
            <p className={styles.text}>분류*</p>
            <Dropdown
              optionList={FOOD_CATEGORIES}
              initialOption={inputValue.category}
              onClick={(value) => onValueChange('category', value)}
            />
          </div>
          <div className={styles.address1}>
            <p className={styles.text}>주소*</p>
            <Dropdown
              optionList={SEOULGROUPLIST}
              initialOption={inputValue.address1}
              onClick={(value) => onValueChange('address1', value)}
            />
          </div>
          <div className={styles.address2}>
            <Input
              type="text"
              label="상세 주소*"
              id="address2"
              value={inputValue.address2}
              onChange={(value) => onValueChange('address2', value)}
            />
          </div>
          <div className={styles.originalHourlyPay}>
            <Input
              type="text"
              label="기본 시급*"
              id="originalHourlyPay"
              value={String(inputValue.originalHourlyPay)}
              onChange={(value) => onValueChange('originalHourlyPay', value)}
            />
          </div>
          <div className={styles.uploadImage}>
            <UploadImage onUploadImage={onUploadImage} />
          </div>
          <div className={styles.description}>
            <Input
              type="textArea"
              label="가게 설명"
              id="description"
              value={inputValue.description}
              onChange={(value) => onValueChange('description', value)}
            />
          </div>
          <div className={styles.registerButton}>
            <Button color="orange" size="large" onClick={handleButtonClick}>
              {shopData?.id ? '완료하기' : '등록하기'}
            </Button>
          </div>
        </form>
      </section>
      <CompletionModal
        isModal={showModal}
        onClose={handleCompletionModalClick}
        type={shopData?.id ? 'edit' : 'registration'}
      />
    </div>
  );
}
