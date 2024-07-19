import './navbar.css'
import React, {useEffect, useRef, useState} from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowDown} from "@fortawesome/free-solid-svg-icons"

const Navbar = ({cards, visibleCards}) => {
    const activeIndex = visibleCards.findIndex(e=>e==true)
    const ref = useRef(null)
    const [isOpen, setIsOpen] = useState(false);
    const [height, setHeight] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const isMobile = window.innerWidth < 600;
    useEffect(()=>{
        setHeight(ref.current.offsetHeight)
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
        
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
        setIsLoaded(true);
    },[])
    const handleMenuToggle = (e)=>{
        setIsOpen(!isOpen)
    }

    return (
        <><div style={{
            top: (isOpen||!isMobile)?0:`-${height*(cards.length)/(cards.length+1)+20}px`,
            transform:isLoaded?"none":"translate(0,-700px)",
        }}className='Nav-Bar'>
            <ul ref={ref}>
                {cards.map((card,i)=>{
                    return <li key={i}><a onClick={(e)=>{setIsOpen(false)}} className={`${activeIndex==i?"active":""}`} href={`#${card.slug}`}>{card.title.rendered}</a></li>
                })}
                {
                isMobile&&
                <li id={`mobile-arrow ${isOpen?"open":""}`} onClick={handleMenuToggle}><a onClick={(e)=>{e.preventDefault()}}>
                <FontAwesomeIcon style={{
                    rotate:`${isOpen?180:0}deg`,
                    transition:"rotate 0.5s ease",
                    
                }} icon={faArrowDown} />
            </a></li>
                }
            </ul>
            </div>
        </>
    );
};

export default Navbar;
