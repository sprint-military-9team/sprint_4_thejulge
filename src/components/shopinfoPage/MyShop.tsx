import Image from 'next/image';
import { ShopDataType } from '@/types';
import { GPS } from '@/utils/constants';
import { useState } from 'react';
import styles from './Myshop.module.scss';
import Button from '../common/Button';
import OwnerAddNotice from '../ownerAddNotice/OwnerAddNotice';
import Registration from './Registration';

export default function MyShop({ shopData }: { shopData: ShopDataType }) {
  const [showShopEdit, setShowShopEdit] = useState(false);
  const [showAddNotice, setShowAddNotice] = useState(false);

  return (
    <>
      <h2 className={styles.title}>내 가게</h2>
      <section className={styles.shopLayout}>
        <article className={styles.shopBox}>
          <Image className={styles.mainImage} src={shopData.imageUrl} alt="shop" width={150} height={150} />
          <div className={styles.shopInfoBox}>
            <p className={styles.label}>식당</p>
            <h2 className={styles.name}>{shopData.name}</h2>
            <p className={styles.address1}>
              <Image src={GPS} alt="location" width={25} height={25} />
              {shopData.address1}
            </p>
            <p className={styles.description}>{shopData.description}</p>
            <div className={styles.buttonBox}>
              <Button color="white" size="medium" onClick={() => setShowShopEdit(true)}>
                편집하기
              </Button>
              <Button color="orange" size="medium" onClick={() => setShowAddNotice(true)}>
                공고 등록하기
              </Button>
            </div>
          </div>
        </article>
      </section>
      {showShopEdit && (
        <div className={styles.modalBox}>
          <Registration onClose={() => setShowShopEdit(false)} />
        </div>
      )}
      {showAddNotice && (
        <div className={styles.modalBox}>
          <OwnerAddNotice onClose={() => setShowAddNotice(false)} />
        </div>
      )}
    </>
  );
}
