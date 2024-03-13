import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styled/Banner.css';

interface BannerData {
  title: string;
  description: string;
  imageUrl: string;
}

const Banner: React.FC = () => {
  const [bannerData, setBannerData] = useState<BannerData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const response = await axios.get<{ data: BannerData }>('https://api.bitdelta.com/api/v1/public/general');
        console.log(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching banner data:', error);
        setLoading(false);
      }
    };

    fetchBannerData();
  }, []);

  return (
    <div className="banner">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="banner-content">
          <h2>{bannerData?.title}</h2>
          <p>{bannerData?.description}</p>
          {/* You can add an image here if provided by the API */}
          {/* <img src={bannerData?.imageUrl} alt="Banner Image" /> */}
        </div>
      )}
    </div>
  );
};

export default Banner;
