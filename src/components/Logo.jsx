import React from 'react';
import './logo.css'
import { Link } from 'react-router-dom';
const Logo = (props) => {
    return (
        <>
        <div className={`Logo ${props.asIcon? "icon":""}`} style={{top:props.asIcon?"70px":window.screen.height*.5}}>
        <h1 >Dream Baby Dream</h1>
        <Link to='/'>
            <img src='./logo.png'></img>
        </Link>
        </div>
        </>
    );
};

export default Logo;
