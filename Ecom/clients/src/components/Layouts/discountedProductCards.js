import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contxt/cart.js';
import CardComponent from './card.js';

const DiscountedProducts = ({ products, discountPercentage }) => {
  const [cart,setCart]=useCart();
  const navigate=useNavigate();
  const styles = {
    card: {
      padding: '10px',
      textAlign: 'center',
      background: '#fff',
      border: '1px solid #ddd',
      borderRadius: '4px',
      margin: '10px',
      width: '250px',
      maxWidth: '350px',
      height: '380px'
    },
    imageContainer: {
      height: '200px',
      overflow: 'hidden'
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'contain'
    },
    container: {
      display: 'flex',
      flexWrap: 'nowrap',
      overflowX: 'auto',
      padding: '10px'
    },
    arrow: {
      color: '#000',
      width: '40px',
      height: '40px',
      zIndex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#8b40ff',
      borderRadius: '50%',
      boxShadow: '0 0 10px rgba(0,0,0,0.2)'
    },
    arrowHover: {
      color: '#444'
    }
  };

  // Filter products based on the provided discount percentage
  const filteredProducts = products.filter(product => {
    const discount = ((product.actualPrice - product.sellingPrice) / product.actualPrice) * 100;
    return discount >= discountPercentage;
  });

  const maxProductsToShow = 15;
  const productsToShow = filteredProducts.slice(0, Math.min(filteredProducts.length, maxProductsToShow));

  const settings = {
    infinite: productsToShow.length > 3,
    speed: 300,
    slidesToShow: Math.min(5, productsToShow.length), // Adjust this based on your design
    slidesToScroll: 1,
    nextArrow: <div className="slick-next" style={{ backgroundColor: 'black', color: 'black' }}>Next</div>,
    prevArrow: <div className="slick-prev">Prev</div>,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(5, productsToShow.length), // Adjust this based on your design
          slidesToScroll: 1,
          infinite: productsToShow.length > 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, ...styles.arrow }}
        onClick={onClick}
      />
    );
  };

  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, ...styles.arrow }}
        onClick={onClick}
      />
    );
  };

  return (
    <div>
      <div className='row d-flex justify-content-between p-3'><h4 className='d-flex justify-content-between'>Products with {discountPercentage}% Discount <span><a href=''>View More</a></span></h4></div>
      <Slider {...settings} nextArrow={<SampleNextArrow />} prevArrow={<SamplePrevArrow />}>
        {productsToShow.map(product => (
          <div key={product._id} className="product-card" style={{ flex: '0 0 auto' }}>
            <CardComponent product={product}/>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default DiscountedProducts;
