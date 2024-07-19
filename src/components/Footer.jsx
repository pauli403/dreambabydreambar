import React from 'react';
import "./footer.css"
    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
const Footer = () => {
    return (
        <div className='Footer'>
            <div>
            <div><p>&copy; 2024 Neubar GmbH</p>
            <p>This site uses only neccesary cookies.</p></div>
            <a href='/imprint'>Imprint</a>
            <a href="https://instagram.com/dreambabydreambar">
                <FontAwesomeIcon style={{color:"rgba(255,255,255,0.5)"}}icon={faInstagram} className='fa-icon'/>
            </a>
            </div>
        </div>
    );
};

export default Footer;
