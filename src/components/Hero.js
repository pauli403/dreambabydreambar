import './hero.css'
import useOnScreen from './useOnScreen';
import React, {useRef, useEffect, useState} from "react"

const Hero = ({ index, onEntry }) => {
    const ref = useRef(null)
    const observer = useOnScreen(ref,(isVisible)=>onEntry(isVisible,index));
    return (
        <>
        <div ref = {ref} className='Hero' style={{height:window.screen.height}} >
        <div className='Background' ></div>
        <div className='Filter' ></div>
        <div className='Gradient'></div>
        </div>
        </>
    );
};

export default Hero;
