import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import useOutsideClick from '@/hooks/useOutsideClick';
import { allowScroll, preventScroll } from '@/utils/modal';
import styles from './Modal.module.scss';

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};

function ModalPortal({ children }: { children: React.ReactNode }) {
  const [isRendering, setIsRendering] = useState(true);

  useEffect(() => {
    setIsRendering(false);
  }, []);

  if (isRendering) return null;
  return ReactDOM.createPortal(children, document.getElementById('modal') as HTMLElement) as JSX.Element;
}

export default function Modal({ children, onClose }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  useOutsideClick(modalRef, onClose);
  useEffect(() => {
    const prevScrollY = preventScroll();
    return () => {
      allowScroll(prevScrollY);
    };
  }, []);

  return (
    <ModalPortal>
      <section className={styles.layout}>
        <div className={styles.box} ref={modalRef}>
          {children}
        </div>
      </section>
    </ModalPortal>
  );
}
