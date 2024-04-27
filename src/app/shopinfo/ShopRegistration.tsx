import { useState } from 'react';
import Registration from '@/components/shopinfoPage/Registartion';
import Button from '@/components/common/Button';
import styles from './page.module.scss';

export default function ShopRegistration() {
  const [showShopRegistartion, setShowShopRegisteration] = useState(false);
  return (
    <div className={styles.layout}>
      <section className={styles.section}>
        <div>
          <h2 className={styles.title}>내 가게</h2>
          <article className={styles.registerLayout}>
            <p>내 가게를 소개하고 공고도 등록해 보세요</p>
            <div className={styles.registerButton}>
              <Button color="orange" size="medium" onClick={() => setShowShopRegisteration(true)}>
                가게 등록하기
              </Button>
            </div>
            {showShopRegistartion && <Registration onClose={() => setShowShopRegisteration(false)} />}
          </article>
        </div>
      </section>
    </div>
  );
}
