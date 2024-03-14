import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styled/Banner.css";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

interface BannerData {
  id: number;
  url: string;
  color: string;
  color_dark: string;
  dark_url: string;
  mobile_url: string;
  tab_url: string;
  link: string;
  timestamp: string;
  is_external_link: boolean;
}

const Banner: React.FC = () => {
  const [bannerData, setBannerData] = useState<BannerData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const response = await axios.get<{ data: { banners: BannerData[] } }>(
          "https://api.bitdelta.com/api/v1/public/general"
        );
        setBannerData(response.data.data.banners);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching banner data:", error);
        setLoading(false);
      }
    };

    fetchBannerData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % bannerData.length);
    }, 3000); // Change interval duration as needed

    return () => clearInterval(interval);
  }, [bannerData.length]);

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? bannerData.length - 1 : prevSlide - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % bannerData.length);
  };

  return (
    <div className="banner">
      <div
        className="banner-content"
        style={{
          backgroundColor: bannerData[currentSlide]?.color,
          display: "flex",
          justifyContent: "center",
          padding: "40px",
        }}
      >
        <button onClick={handlePrevSlide}>
          <GrFormPrevious />
        </button>
        <img src={window.innerWidth < 768 ? bannerData[currentSlide]?.mobile_url : bannerData[currentSlide]?.url } alt="Banner Image" />

        <button onClick={handleNextSlide}>
          <GrFormNext />
        </button>
      </div>
    </div>
  );
};

export default Banner;
