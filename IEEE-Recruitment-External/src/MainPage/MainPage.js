import React from 'react';
import {Animated} from "react-animated-css";

import './MainPage.css';

import ieeeLogo from '../assets/IEEE new white cropped@3x.png'; 
import twitter from '../assets/twitter.png'
import fbLogo from '../assets/facebook.svg';
import instaLogo from '../assets/instaLogo.png';
import github from '../assets/github.png'
import linked from '../assets/linked.png'
import www from '../assets/www.png'
// import recruitments from '../assets/RECRUITMENTS.png';
import background from '../assets/vec1.png';
import down from '../assets/dropdown.svg'

const MainPage = ({changePage}) => {
    return(
        <div className='mainPage'>
            <div className="topHalf">
                <img className="white-logo" src={ieeeLogo} alt="IEEE-VIT_logo"/>
                <img className="man" src={background} alt="background_image"/>
                {/* <img className="rec-logo" src={recruitments} alt="recruitment" /> */}
                <div className="click">
                    <p className="ptag">CLICK HERE</p>
                    <Animated animationIn="flash" style={{"animation-iteration-count": "infinite"}} animationInDuration="2000" isVisible={true}>{/*animationInDuration="10"*/}
                        <img className="down" src={down} alt="Register" onClick={()=>changePage("questionPage")}/>
                    </Animated>
                </div>

                <div className="svg-container">
                    <svg height="550" width="500">
                        <ellipse className="top-ellip" cx="40vw" cy="0vh" rx="60vw" ry="50vh" transform = "rotate(45 100 100)"/>
                        <ellipse className="top-ellip-desk" cx="40vw" cy="25vh" rx="80vw" ry="60vh" transform = "rotate(-8 100 100)"/>
                    </svg>
                </div>

            </div>
            <div className="bottomHalf">
                <div className="main-text">
                    <div className="text-container-1">CORE COMMITTEE</div>
                    <div className="text-container-2">RECRUITMENTS</div>
                    <div className="text-container-3">Join the legacy!</div>
                </div>
                <div className="footer">
                    <div>
                        <img className="social-Twitter" src={twitter} alt="twitter" onClick={()=>{
                            // her("Hello!");
                            window.location.assign("https://twitter.com/ieeevitvellore?s=08");
                        }}/>
                    </div>
                    <a href="https://www.facebook.com/IEEEVIT/"><img className="social" src={fbLogo} alt="facebook" /></a>
                    <a href="https://www.instagram.com/ieeevitvellore/?hl=en"><img className="social" src={instaLogo} alt="instagram" /></a>
                    <a href="https://github.com/IEEE-VIT"><img className="social" src={github} alt="github"/></a>
                    <a href="https://in.linkedin.com/company/ieee-vit"><img className="social" src={linked} alt="linked" /></a>
                    <a href="https://ieeevit.com/"><img className="social" src={www} alt="www" /></a>
                </div>
            </div>

            {/* <div className="topHeader">
                <img className="recruitmentLogo" src={recruitments} alt="recruitments" style={{"background-color": "black"}}/>
                <img className="ieeeLogo" src={ieeeLogo} alt="IEEE-VIT_logo"/>
            </div>
            <div className="main-container">
                <img className="legacy" src={legacy} alt="WANT TO JOIN OUR LEGACY?"/>
                <button className="join" onClick={()=>changePage("questionPage")}>Join The Legacy!</button>
            </div>

            
            <div className="footer-container">
                <img className="socialFB" style={{ "alignSelf": "flex-end" }} src={fbLogo} alt="IEEE-VIT_facebook_logo" />
                <img className="socialIN" style={{ "alignSelf": "flex-start" }} src={instaLogo} alt="IEEE-VIT_instagram_logo" />
            </div>             */}
        </div>
    )
}

export default MainPage;

/* MainPage
            <img src={ieeeLogo} alt=""/>
            <textarea type="text" rows={"10"} columns={"10"} placeholder={"Type here"}/>
            <img src={recruitments} alt="" style={{"background-color": "black"}}/>
            <img src={fbLogo} alt="" />
            <img src={instaLogo} alt="" />
            <img src={ieeeLogo1} alt=""/>
            <img src={background} alt=""/>
            <button onClick={()=>changePage("questionPage")}>V</button> */