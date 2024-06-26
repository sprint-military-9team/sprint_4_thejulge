import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { allowScroll, preventScroll } from '@/utils/modal';
import styles from './Modal.module.scss';

type ModalProps = {
  children: React.ReactNode;
};

function ModalPortal({ children }: { children: React.ReactNode }) {
  const [isRendering, setIsRendering] = useState(true);
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setIsRendering(false);
    setElement(document.getElementById('modal'));
  }, []);

  if (isRendering || !element) return null;
  return ReactDOM.createPortal(children, element) as JSX.Element;
}

export default function Modal({ children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
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
