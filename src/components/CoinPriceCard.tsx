import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styled/CoinPriceCard.css'

interface CoinPrice {
  symbol: string;
  last: number;
  highest_bid: number;
  lowest_ask: number;
  change: number;
}

const CoinPriceCard: React.FC<{ pairSymbol: string }> = ({ pairSymbol }) => {
  const [coinPrice, setCoinPrice] = useState<CoinPrice | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCoinPrice = async () => {
      try {
        const response = await axios.get<{ data: any }>('https://api-staging.bitdelta.com/api/v1/market/pairs', {
          headers: {
            'x-api-key': 'BitdeltaExchange'
          }
        });
  
        const coinPair = response.data.data.spot.find((pair: any) => pair.symbol === pairSymbol);
        //console.log(coinPair);
        
        
        if (coinPair) {
          setCoinPrice(coinPair);
          setLoading(false);
        } else {
          console.error('Coin pair not found:', pairSymbol);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching coin price:', error);
        setLoading(false);
      }
    };
  
    fetchCoinPrice();
  }, [pairSymbol]);
  
  return (
    <div className="coin-price-card">
      {loading ? (
        <p>Loading coin price...</p>
      ) : coinPrice ? (
        <div>
          <h2>{coinPrice.symbol}</h2>
          <p>Last Price: {coinPrice.last}</p>
          <p>{coinPrice.change.toFixed(2)}</p>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default CoinPriceCard;
