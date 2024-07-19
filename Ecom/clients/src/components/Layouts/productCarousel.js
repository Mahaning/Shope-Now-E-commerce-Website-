import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useCart } from '../../contxt/cart.js';

import { useNavigate } from 'react-router-dom';
import CardComponent from './card.js';

const ProductCarousel = ({ products, category }) => {
  const navigate=useNavigate();
  const [cart,setCart]=useCart();
  const styles = {
    card: {
      padding: '10px',
      textAlign: 'center',
      background: '#fff',
      border: '1px solid #ddd',
      borderRadius: '4px',
      margin: '10px',
      maxWidth: '300px',
      height: '450px' // Set a fixed height for the card container
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
    title: {
      fontSize: '16px',
      margin: '10px 0'
    },
    description: {
      fontSize: '14px',
      color: '#333'
    },
    viewMore: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      fontSize: '16px'
    },
    arrow: {
      color: '#000', // Dark color for the buttons
      width: '40px',
      height: '40px',
      zIndex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#fff',
      borderRadius: '50%',
      boxShadow: '0 0 10px rgba(0,0,0,0.2)'
    }
  };

  const maxProductsToShow = 15;
  const productsToShow = products.slice(0, maxProductsToShow);

  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, ...styles.arrow }}
        onClick={onClick}
      >
        Next
      </div>
    );
  };

  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, ...styles.arrow }}
        onClick={onClick}
      >
        Prev
      </div>
    );
  };

  const settings = {
    infinite: productsToShow.length > 3,
    speed: 300,
    slidesToShow: Math.min(5, productsToShow.length),
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(4, productsToShow.length),
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

  return (
    <>
      <h2 style={{ marginTop: "50px" }}>{category}</h2>
      <Slider {...settings}>
        {productsToShow.map(product => (
          <div key={product._id} style={styles.card}>
            <CardComponent product={product}/>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default ProductCarousel;
