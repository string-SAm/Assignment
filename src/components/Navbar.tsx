import React from 'react';
import LanguageSelector from './LanguageSelector';
import CurrencySelector from './CurrencySelector';
import { relative } from 'path';

const Navbar: React.FC = () => {
  return (
    <nav style={navStyle}>
      <div style={brandStyle}>NFT MarketPlace</div>
      <ul style={ulStyle}>
      <LanguageSelector/>
      <CurrencySelector/>
        <li style={liStyle}><a href="/">News Subscription</a></li>
      </ul>
    </nav>
  );
};

  
const navStyle: React.CSSProperties = {
  // display: 'flex',
  // justifyContent: 'space-between',
  // alignItems: 'center',  
  // color: '#fff',
  // padding: '10px 20px',
  // borderBottomWidth:'1px',
  // borderBottomColor:'#333',
  // borderBottomStyle:'solid',
};

const brandStyle: React.CSSProperties = {
 
};

const ulStyle: React.CSSProperties = {
  
  
  
};

const liStyle: React.CSSProperties = {
  
};

export default Navbar;
