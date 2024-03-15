import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styled/CoinPriceCard.css";
import LineChart from "./Chart";

interface CoinPrice {
  symbol: string;
  last: number;
  highest_bid: number;
  lowest_ask: number;
  change: number;
  pricing: number[];
}

const CoinPriceCard: React.FC<{ pairSymbol: string }> = ({ pairSymbol }) => {
  const [coinPrice, setCoinPrice] = useState<CoinPrice | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCoinPrice = async () => {
      try {
        const response = await axios.get<{ data: any }>(
          "https://api-staging.bitdelta.com/api/v1/market/pairs",
          {
            headers: {
              "x-api-key": "BitdeltaExchange",
            },
          }
        );

        const coinPair = response.data.data.spot.find(
          (pair: any) => pair.symbol === pairSymbol
        );
        //console.log(coinPair);

        if (coinPair) {
          setCoinPrice(coinPair);
          setLoading(false);
        } else {
          console.error("Coin pair not found:", pairSymbol);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching coin price:", error);
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
        <div style={{ display: "flex", justifyContent: "space-between"}}>
          <div>
            <h3>{coinPrice.symbol}</h3>
            <p>$ {coinPrice.last}</p>
            <p
              style={
                coinPrice.change >= 0 ? { color: "green" } : { color: "red" }
              }
            >
              {coinPrice.change.toFixed(2)}
            </p>
          </div>
          <div className="chart">
            <LineChart
              data={{
                data: coinPrice.pricing,
                change:coinPrice.change,
               
              }}
            />
          </div>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default CoinPriceCard;
