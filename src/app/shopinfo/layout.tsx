import Footer from '@/components/common/Footer/Footer';
import Header from '@/components/common/Header';
import { ShopDataContextProvider } from '@/context/ShopDataContext';
import styles from './layout.module.scss';

export default function shopInfoLayout({ children }: { children: React.ReactNode }) {
  return (
    <ShopDataContextProvider>
      <div className={styles.layout}>
        <Header />
        <div className={styles.box}>
          {children}
          <Footer />
        </div>
      </div>
    </ShopDataContextProvider>
  );
}
