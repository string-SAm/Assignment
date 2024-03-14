import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styled/LanguageSelector.css';
import { AiOutlineGlobal } from 'react-icons/ai';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { CiCircleCheck } from "react-icons/ci";


interface Language {
  lang: string;
  slug: string;
  default: boolean;
  rtl: boolean;
}

const LanguageSelector: React.FC = () => {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await axios.get<{ data: Language[] }>('https://api-staging.bitdelta.com/api/v1/public/lang');
        setLanguages(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching languages:', error);
        setLoading(false);
      }
    };

    fetchLanguages();
  }, []);

  const toggleLanguageList = () => {
    setIsOpen(prevState => !prevState);
    
  };

  const handleLanguageSelect = (slug: string) => {
    setSelectedLanguage(slug);
    
  };

  return (
    <div className='lang-container'>
      <div className='lang-scroller' onClick={toggleLanguageList}>
        <span style={{ display:'flex',justifyContent:'space-around',gap:'10px'}}>
          <AiOutlineGlobal /> {selectedLanguage ? languages.find(lang => lang.slug === selectedLanguage)?.lang : 'Language Selector'} {isOpen ? <BsChevronUp /> : <BsChevronDown />}
        </span >
        {isOpen && (
          <div className='lang-list'>
            {loading ? (
              <p>Loading languages...</p>
            ) : (
              languages.map(language => (
                <div key={language.slug} className={`lang-item ${selectedLanguage === language.slug ? 'selected' : ''}`} onClick={() => handleLanguageSelect(language.slug)}>
                  {language.lang} {selectedLanguage === language.slug && <CiCircleCheck />}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageSelector;
