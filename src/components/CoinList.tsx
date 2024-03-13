import React, { useState, useEffect } from 'react';
import './styled//CoinList.css'
import axios from 'axios';

interface MarketPair {
  lowest_ask: number;
  highest_bid: number;
  currency1:string;
  coin_slug: string;
  last: number;
  volume:number;
  // Add other properties according to the response data structure
}

const API_ENDPOINT = 'https://api-staging.bitdelta.com/api/v1/market/pairs';
const API_KEY = 'BitdeltaExchange';

const CoinList: React.FC = () => {
  const [marketPairs, setMarketPairs] = useState<MarketPair[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{ data: { spot: MarketPair[] } }>(API_ENDPOINT, {
          headers: {
            'x-api-key': API_KEY
          }
        });
        //console.log('Response data:', response.data);
        setMarketPairs(response.data.data.spot);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 style={{textAlign:'center',}}>Market Pairs</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="table-wrapper">
          <table className="fl-table">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Last Price</th>
                <th>Highest Bid</th>
                <th>Lowest Ask</th>
                <th>Volume</th>
              </tr>
            </thead>
            <tbody>
              {marketPairs.map(pair => {
                return (
                  <tr key={pair.currency1}>
                    <td>{pair.coin_slug} - {pair.currency1}</td>
                    <td>{pair.last}</td>
                    <td>{pair.highest_bid}</td>
                    <td>{pair.lowest_ask}</td>
                    <td>{pair.volume}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CoinList;
