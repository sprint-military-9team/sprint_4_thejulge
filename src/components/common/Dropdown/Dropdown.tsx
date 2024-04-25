import { useState } from 'react';
import { ARROW_DOWN, ARROW_UP } from '@/utils/constants';
import Image from 'next/image';
import css from './Dropdown.module.scss';

type DropdownProps = {
  optionList: string[];
  onClick: (option: string) => void;
  initialOption?: string | null;
};

export default function Dropdown({ optionList = [], onClick, initialOption = null }: DropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(initialOption);

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onClick(option);
  };

  return (
    <section className={css.layout}>
      <button className={css.button} type="button" onClick={handleButtonClick}>
        {selectedOption || 'Select Option'}
        <Image src={isOpen ? ARROW_UP : ARROW_DOWN} alt={isOpen ? 'arrow_up' : 'arrow_down'} width={10} height={10} />
      </button>
      {isOpen && (
        <div className={css.optionsBox}>
          {optionList.map((option) => (
            <button type="button" className={css.option} key={option} onClick={() => handleOptionClick(option)}>
              {option}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

