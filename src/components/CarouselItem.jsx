import React from 'react';
import "./carousel.css"
const CarouselItem = ({index, currentIndex,cocktail}) => {
    return (
        <div className={`CarouselItem ${index===currentIndex ? 'active' : ''}`}>
            <img src={cocktail.image}></img>
            <div>
            <h3>{`${cocktail.title}`}</h3>
            <div className='Extender'>
            <p> {cocktail.promo_text}</p>
            </div>
            </div>
        </div>
    );
};

export default CarouselItem;
