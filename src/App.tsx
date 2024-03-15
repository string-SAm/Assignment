import React from "react";
import CoinList from "./components/CoinList";
import Navbar from "./components/Navbar";
import CoinPriceCard from "./components/CoinPriceCard";
import './App.css'
import Banner from "./components/Banner";
import CurrencySelector from "./components/CurrencySelector";
import LanguageSelector from "./components/LanguageSelector";
import NewsLetter from "./components/Newsletter";

function App() {
  return (
    <div >
      
      <LanguageSelector />
      <CurrencySelector/>
      
      
      <div className="card-container" style={{display:'flex', justifyContent:'space-around', }}>
        <CoinPriceCard pairSymbol="ETHUSDT" />
        <CoinPriceCard pairSymbol="BTCUSDT" />
        <CoinPriceCard pairSymbol="XRPUSDT" />
      </div>
      <Banner/>
      <CoinList />
      <NewsLetter/>
      
    </div>
  );
}

export default App;
