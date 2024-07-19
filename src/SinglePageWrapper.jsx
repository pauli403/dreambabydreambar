import React, { useEffect } from 'react';
import Logo from './components/Logo';
import "./components/navbar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowDown} from "@fortawesome/free-solid-svg-icons"
import { useState, useRef } from 'react';
import {useNavigate} from "react-router-dom"

const SinglePageWrapper = ({children}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const ref = useRef(null);
    const navigate = useNavigate();

    const handleMenuToggle = ()=>{
        navigate("/");
    }
    useEffect(()=>{
        setIsLoaded(true);
    },[])
    return (
        <>
        <div style={{
            transform:isLoaded?"none":"translate(0,-700px)"
        }}className='Nav-Bar NavBarSubpage'>
            <ul ref={ref}>
                {
                <li id={`mobile-arrow`} onClick={handleMenuToggle}><a onClick={(e)=>{e.preventDefault()}}>
                <FontAwesomeIcon style={{
                    rotate:`90deg`,
                    transition:"rotate 1s ease",
                    marginRight:"16px"
                }} icon={faArrowDown} />
                Go Back
            </a></li>
                }
            </ul>
            </div>
        <Logo asIcon={true}/>
        <div className='SinglePage'>
            {children}
        </div>
        </>
    );
};

export default SinglePageWrapper;
