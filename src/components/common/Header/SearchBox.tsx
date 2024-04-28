'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { SEARCH_ICON } from '@/utils/constants';
import BASE_URL from '@/constants/BASEURL';
import useOutsideClick from '@/hooks/useOutsideClick';
import styles from './SearchBox.module.scss';

export default function SearchBox() {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');
  const [showAutoSuggestion, setShowAutoSuggestion] = useState(false);
  const [suggestionList, setSuggestionList] = useState([]);
  const autoSuggestionRef = useRef(null);
  const inputRef = useRef(null);
  useOutsideClick(autoSuggestionRef, () => setShowAutoSuggestion(false));

  const handleSuggestionClick = (event) => {
    setKeyword(event.target.id);
    inputRef.current.focus();
    setShowAutoSuggestion(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && keyword) {
      router.push(`/?keyword=${keyword}`);
    }
  };

  useEffect(() => {
    let debounce;
    if (keyword) {
      debounce = setTimeout(async () => {
        try {
          const response = await fetch(
            `${BASE_URL}/notices?limit=10&keyword=${encodeURIComponent(keyword.trim())}&sort=time`,
          );
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const searchSet = new Set<string[]>();
          const data = await response.json();
          data.items.filter((item) => searchSet.add(item.item.shop.item.name));
          setSuggestionList([...searchSet]);
        } catch (error) {
          console.error('There was a problem with your fetch operation:', error);
        }
      }, 200);
    } else {
      setSuggestionList([]);
    }

    return () => {
      clearTimeout(debounce);
    };
  }, [keyword]);

  return (
    <form className={styles.searchBarWrapper} onSubmit={(e) => e.preventDefault()} ref={autoSuggestionRef}>
      <Image src={SEARCH_ICON} alt="search" width={21} height={20} className={styles.searchButton} priority />
      <input
        className={styles.searchBar}
        value={keyword}
        ref={inputRef}
        onFocus={() => setShowAutoSuggestion(true)}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="가게 이름으로 찾아보세요"
      />
      {showAutoSuggestion && (
        <div className={styles.itemBox}>
          {suggestionList.map((data) => (
            <button
              type="button"
              className={styles.item}
              key={data}
              id={data}
              onClick={handleSuggestionClick}
              aria-label={`${data}을(를) 선택하려면 클릭하세요.`}
              dangerouslySetInnerHTML={{
                __html: data.replace(
                  new RegExp(`(${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'),
                  '<strong>$1</strong>',
                ),
              }}
            />

            // <button type="button" className={styles.item} key={data} id={data} onClick={handleSuggestionClick}>
            //   {data}
            // </button>
          ))}
          {suggestionList.length === 0 && (
            <button type="button" className={styles.item}>
              검색된 결과가 없습니다.
            </button>
          )}
        </div>
      )}
    </form>
  );
}
