import React from 'react';
import BanImage from '../../assets/banner2.png'
import Recruitment from '../../assets/recruitment.png'
import IEEE from '../../assets/logo.png'
import Insta from '../../assets/insta.png'
import FB from '../../assets/facebook.png'

import './Banner.css'

const Banner = () => {
    return(
        <div className='banner'>
            <img className='bannerimg' src={BanImage} alt='working ban banner'></img>
            <img className='recruitment' src={Recruitment} alt='recruitment'></img>
            <img className='ieee' src={IEEE} alt='ieee'></img>
            <a href="https://www.facebook.com/IEEEVIT/ "><img className='facebook' src={FB} alt='facebook'></img> </a>
            <a href="https://www.instagram.com/ieeevitvellore/?hl=en"> <img className='insta' src={Insta} alt='instagram'></img> </a>
        </div>
    )
}

export default Banner;