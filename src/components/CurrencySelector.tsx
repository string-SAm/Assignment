import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styled/CurrencySelector.css';
import { AiOutlineGlobal } from 'react-icons/ai';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { CiCircleCheck } from "react-icons/ci";

interface Currency {
  id: number;
  name: string;
  symbol: string;
  usd_rate: number;
  default: boolean;
}

const CurrencySelector: React.FC = () => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedCurrency, setSelectedCurrency] = useState<number | null>(null);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get<{ data: { currencies: Currency[] } }>('https://api-staging.bitdelta.com/api/v1/public/fiat-currency');
        setCurrencies(response.data.data.currencies);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching currencies:', error);
        setLoading(false);
      }
    };

    fetchCurrencies();
  }, []);

  const toggleCurrencyList = () => {
    setIsOpen(prevState => !prevState);
  };

  const handleCurrencySelect = (id: any) => {
    setSelectedCurrency(id);
    // setIsOpen(false);
  };

  return (
    <div className='container'>
  <div className='scroller' onClick={toggleCurrencyList}>
    <span>
      <AiOutlineGlobal /> {selectedCurrency ? selectedCurrency : 'Currency Selector'} {isOpen ? <BsChevronUp /> : <BsChevronDown />}
    </span>
    {isOpen && (
      <div className='currency-list'>
        {loading ? (
          <p>Loading currencies...</p>
        ) : (
          currencies.map(currency => (
            <div key={currency.id} className={`item ${selectedCurrency === currency.id ? 'selected' : ''}`} onClick={() => handleCurrencySelect(currency.name)}>
              {currency.name} {selectedCurrency === currency.id && <CiCircleCheck />}
            </div>
          ))
        )}
      </div>
    )}
  </div>
</div>

  );
};

export default CurrencySelector;
