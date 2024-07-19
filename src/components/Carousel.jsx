import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useEffect, useRef, useState } from "react";
import useOnScreen from './useOnScreen';
import Slider from "react-slick";
import CarouselItem from "./CarouselItem";
import { Link } from "react-router-dom";

function Carousel({ index, onEntry, cocktails }) {
  const [slideIndex, setSlideIndex] = useState(1);
  const refVisbible = useRef(null)
  const observer = useOnScreen(refVisbible, (isVisible) => onEntry(isVisible, index));

  useEffect(() => {
    if (window.innerWidth < 850) {
      setSlideIndex(0);
    }

  }, []);

  const ref = useRef(null);
  const numSlides = cocktails.filter((e) => e.show_in_carousel).length;
  const handleNextSlide = () => {
    // @ts-ignore
    ref.current.slickNext();
  };

  const handlePrevSlide = () => {
    // @ts-ignore
    ref.current.slickPrev();
  };
  const settings = {
    infinite: true,
    arrows: false,
    dots: false,
    swipeToSlide: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 4000,
    cssEase: "linear",
    beforeChange: (_, next) => {
      setSlideIndex((next + 1) % numSlides);
    },

    responsive: [
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 2,
          beforeChange: (_, next) => {
            setSlideIndex(next);
          },
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          speed: 500,
          beforeChange: (_, next) => {
            setSlideIndex(next);
          },
        }
      }
    ],

  };
  return (
    <>
      <h2 id="cocktails" style={{ gridColumnStart: 2 }}>Cocktails</h2>
      <button style={{ gridColumnStart: 1 }} onClick={handlePrevSlide}>
        <img className="Arrow" src="./assets/arrow-left.svg" alt="Arrow Left" />
      </button>
      <div ref={refVisbible} className="Slider-Container" style={{
        gridColumnStart: 2,
        gridColumnEnd: 12,
      }}>
        <Slider ref={ref} {...settings}>
          {cocktails.filter((e) => e.show_in_carousel).map((cocktail, index) => {
            return <div>
              <div className="CardContainer">
                <CarouselItem key={index} index={index} currentIndex={slideIndex} cocktail={cocktail} />
              </div>
            </div>
          })
          }

        </Slider>
      </div>
      <button className="Arrow" style={{ gridColumnStart: 12 }} onClick={handleNextSlide}>
        <img src="./assets/arrow-right.svg" alt="Arrow Right" />
      </button>
      <div style={
        {
          width: "100%",
          gridColumnStart: 1,
          gridColumnEnd: 13,
          display: "flex",
          justifyContent: "center"
        }
      }>
        <Link style={{
          margin: 0,
          textDecoration: "none"
        }} to="/menu"><button className="Default-Button" >See the full menu</button></Link>
      </div>
    </>
  );
}

export default Carousel;
