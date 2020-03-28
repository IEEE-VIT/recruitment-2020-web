import React from 'react';

import './ThankYou.css';

import ieeeLogo from '../../assets/ieeeLogo.png';
import background from '../../assets/vec1.png';
import checkCircle from '../../assets/check-circle.svg';
import twitter from '../../assets/twitter.png'
import fbLogo from '../../assets/facebook.svg';
import instaLogo from '../../assets/instaLogo.png';
import github from '../../assets/github.png'
import linked from '../../assets/linked.png'
import www from '../../assets/www.png'
import newtwit from '../../assets/twit.png'

class ThankYouPage extends React.Component{
    render()
     {
        //  console.log("Entered here!");
         return(
            <div>
                <img className="thank-man" src={background} alt="background_image"/>
                <div className="thank-mainPage">
                    <img className="thank-white-logo" src={ieeeLogo} alt="IEEE-VIT_logo"/>
                    <div className="centralizer">
                        <img className="thank-you" src={checkCircle} alt="Thank You"/>
                        <p className="thank-p">Thank you for your submissions</p>
                    </div>
                    <div className="thank-footer">
                        <img className="thank-social" src={newtwit} alt="twitter" />
                        <img className="thank-social" src={fbLogo} alt="facebook" />
                        <img className="thank-social" src={instaLogo} alt="instagram" />
                        <img className="thank-social" src={github} alt="github"/>
                        <img className="thank-social" src={linked} alt="linked" />
                        <img className="thank-social" src={www} alt="www" />
                    </div>
                </div>
            </div>
         );
     }
}

export default ThankYouPage;