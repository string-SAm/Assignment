import React from 'react';
import styles from './styled/ScrollBar.module.css'; // Assuming your CSS file is named styles.module.css
import { AiOutlineGlobal } from 'react-icons/ai';
import { BsChevronDown } from 'react-icons/bs';

interface Language {
  id?:number;
  Selector?: string;
  name?: string;
  code?: string;
}

interface ScrollBarProps {
  languages: Language[];
}

const ScrollBar: React.FC<ScrollBarProps> = ({ languages }) => {
  return (
    <div className={styles.container}>
      <div className={styles.scroller}>
        <span>
          <AiOutlineGlobal /> Language Selector <BsChevronDown />
        </span>
        <div className={styles.languageList}>
          {languages.map(language => (
            <div key={language.id} className={styles.item}>
              {language.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollBar;
