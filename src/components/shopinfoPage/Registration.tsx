'use client';

import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { SEOULGROUPLIST } from '@/constants/SEOUL';
import FOOD_CATEGORIES from '@/constants/SHOP';
import { CLOSE_ICON } from '@/utils/constants';
import BASE_URL from '@/constants/BASEURL';
import Cookies from 'js-cookie';
import { ShopDataContext } from '@/context/ShopDataContext';
import { useRouter } from 'next/navigation';
import { DarkModeContext } from '@/context/DarkModeContext';
import Dropdown from '../common/Dropdown/Dropdown';
import Input from '../common/Input/Input';
import styles from './Registration.module.scss';
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
  const [emptyList, setEmptyList] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<FormData>({
    name: '',
    category: '',
    address1: '',
    address2: '',
    imageUrl: '',
    description: '',
    originalHourlyPay: '',
  });
  const { isDarkMode } = useContext(DarkModeContext);
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

  const onBlur = (name: string) => {
    if (!inputValue[name].trim()) {
      return setEmptyList((prev) => [...prev, name]);
    }
    return setEmptyList((prev) => prev.filter((prevName) => prevName !== name));
  };

  const handleCompletionModalClick = () => {
    setShowModal(false);
    onClose();
    router.refresh();
  };

  const checkEmptyError = (name: string) => emptyList.includes(name);
  const checkNumber = (value: string) => Number.isNaN(Number(value));
  const handleButtonClick = async () => {
    const tmpList = Object.keys(inputValue).filter((key) => !inputValue[key]);
    setEmptyList(tmpList);
    if (tmpList.length) return;

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
      setInputValue({
        name,
        category,
        address1,
        address2,
        imageUrl,
        description,
        originalHourlyPay: String(originalHourlyPay),
      });
    }
  }, [shopId]);

  return (
    <div className={styles.layout}>
      <section className={styles.box}>
        <div className={styles.titleBox}>
          <h2 className={styles.title}>가게 정보</h2>
          <Image
            style={
              isDarkMode && {
                filter: 'invert(100%) sepia(0%) saturate(7484%) hue-rotate(242deg) brightness(300%) contrast(100%)',
              }
            }
            src={CLOSE_ICON}
            alt="close"
            width={35}
            height={35}
            onClick={onClose}
          />
        </div>
        <form className={styles.form}>
          <div className={styles.name}>
            <Input
              type="text"
              label=" 가게 이름*"
              id="name"
              value={inputValue.name}
              onChange={(value) => onValueChange('name', value)}
              onBlur={() => onBlur('name')}
              isError={checkEmptyError('name')}
              errorMessage="이름을 작성해주세요."
            />
          </div>
          <div className={styles.category}>
            <p className={styles.text}>분류*</p>
            <Dropdown
              optionList={FOOD_CATEGORIES}
              initialOption={inputValue.category}
              onClick={(value) => onValueChange('category', value)}
            />
            <p className={styles.margin}> </p>
          </div>
          <div className={styles.address1}>
            <p className={styles.text}>주소*</p>
            <Dropdown
              optionList={SEOULGROUPLIST.sort()}
              initialOption={inputValue.address1}
              onClick={(value) => onValueChange('address1', value)}
            />
            <p className={styles.margin}> </p>
          </div>
          <div className={styles.address2}>
            <Input
              type="text"
              label="상세 주소*"
              id="address2"
              value={inputValue.address2}
              onChange={(value) => onValueChange('address2', value)}
              onBlur={() => onBlur('address2')}
              isError={checkEmptyError('address2')}
              errorMessage="상세 주소를 작성해주세요."
            />
          </div>
          <div className={styles.originalHourlyPay}>
            <Input
              type="text"
              label="기본 시급*"
              id="originalHourlyPay"
              value={String(inputValue.originalHourlyPay)}
              unit="원"
              onChange={(value) => onValueChange('originalHourlyPay', value)}
              onBlur={() => onBlur('originalHourlyPay')}
              isError={checkEmptyError('originalHourlyPay') || checkNumber(inputValue.originalHourlyPay)}
              errorMessage="기본시급을 올바르게 작성해주세요."
            />
          </div>
          <div className={styles.uploadImage}>
            <UploadImage onUploadImage={onUploadImage} imageUrl={shopData.imageUrl} />
          </div>
          <div className={styles.description}>
            <Input
              type="textArea"
              label="가게 설명"
              id="description"
              value={inputValue.description}
              onChange={(value) => onValueChange('description', value)}
              onBlur={() => onBlur('description')}
              isError={checkEmptyError('description')}
              errorMessage="가게 설명을 작성해 주세요."
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
