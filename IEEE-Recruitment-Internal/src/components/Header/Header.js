import React from 'react';
import IEEElogo from '../../assets/ieeewhite.png';

import './Header.css';

const Header = () => {
    return(
        <div className='header'>
            <p className='recruitments'> RECRUITMENTS </p>
            <img className='ieeelogo' src={IEEElogo} alt='ieeelogo'></img>
        </div>
    )
}

export default Header;