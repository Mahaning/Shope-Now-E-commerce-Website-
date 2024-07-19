import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../Styleheets/Banner.css';

const BannerSlider = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchActiveBanners = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/banner/get-all-active-banners`);
        console.log('Fetched banners:', data); // Debugging log
        const formattedSlides = data.map(banner => ({
          image: `data:${banner.bannerImage.contentType};base64,${banner.bannerImage.data}`,
          text: banner.bannerDescription
        }));
        setSlides(formattedSlides);
      } catch (error) {
        console.error('Failed to fetch active banners', error);
      }
    };

    fetchActiveBanners();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    adaptiveHeight: true,
  };

  return (
    <Slider {...settings}>
      {slides.length > 0 ? (
        slides.map((slide, index) => (
          <div key={index}>
            <div className="banner-container">
              <img src={slide.image} alt={slide.text} className="banner-image" />
              <div className="banner-text">{slide.text}</div>
            </div>
          </div>
        ))
      ) : (
        <div>No banners available</div>
      )}
    </Slider>
  );
};

export default BannerSlider;
