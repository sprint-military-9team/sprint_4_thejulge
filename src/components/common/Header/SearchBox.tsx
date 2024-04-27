'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import { SEARCH_ICON } from '@/utils/constants';
import styles from './SearchBox.module.scss';

export default function SearchBox() {
  const router = useRouter();
  const [input, setInput] = useState('');
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && input) {
      router.push(`/?keyword=${input}`);
    }
  };
  return (
    <form className={styles.searchBarWrapper} onSubmit={(e) => e.preventDefault()}>
      <Image src={SEARCH_ICON} alt="search" width={20} height={20} className={styles.searchButton} priority />
      <input
        className={styles.searchBar}
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="가게 이름으로 찾아보세요"
      />
    </form>
  );
}
