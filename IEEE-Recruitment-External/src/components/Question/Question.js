import React from 'react';

import './Question.css';

import ieeeLogo from '../../assets/ieeeLogo.png';
import background from '../../assets/vec1.png';
// import twitter from '../../assets/twitter.png'
import fbLogo from '../../assets/facebook.svg';
import instaLogo from '../../assets/instaLogo.png';
import github from '../../assets/github.png'
import linked from '../../assets/linked.png'
import www from '../../assets/www.png'
import down from '../../assets/down.svg'
import newtwit from '../../assets/twit.png'

var Recaptcha = require('react-recaptcha');

class QuestionPage extends React.Component{
    constructor()
     {
         super();
         this.state={
             isVerified: false,
             err: false,
             errMsg: "",
             token: ""
         }
     }//some change
    callback = function () {
        // console.log('Captcha Loaded');
    };
    verifyCallback=(a)=>{
        // console.log();
        if (a) {
            this.setState({isVerified: true}, () => {
                // console.log("Verified recaptcha!");
            });
            // console.log(a);
            this.setState({
                token: a
            });
            this.props.updateToken(a);
        }
        else {
            this.setState({isVerified: false});
            // console.log("Failed to verify recaptcha!");
            this.setState({err: true});
            this.setState({errMsg: "Failed to verify recaptcha!"});
        }
    }
    clearInput=(a)=>{
        // console.log(a);
        if(a===undefined)
         {
             a="";
         }
        document.getElementById("textArea").value=a;
        // console.log(document.getElementById("textArea"));
    }

    // keyPress=(event)=>{
    //     var code = (event.keyCode ? event.keyCode : event.which);
    //     if(code===13) { //Enter keycode
    //         console.log("Enter hitted!");
    //         var resp=this.props.decrementI();
    //         //console.log(resp);
    //         if(resp!=="Overflow" && resp!=="Underflow")
    //         {
    //             this.clearInput("");
    //             var a=this.props.currentAnswer("decrement");
    //             this.clearInput(a);
    //         }
    //         var b=this.props.textAreaUnhide();                           
    //         if(b)
    //          {
    //             document.getElementById("textArea").style.display="block";
    //          }
    //     }
    // }
    
    render()
     {
        //  console.log("Rerendering!");
         if(this.props.showDomains)
          {
            //   console.log("Here!");
            //   console.log(document.getElementById("textArea"));
            document.getElementById("textArea").style.display="none";
            document.getElementById("domain-list").style.display="flex";
          }
        if(!this.props.showDomains)
         {
             if(document.getElementById("textArea"))
              {
                document.getElementById("textArea").style.display="inline";
              }
            if(document.getElementById("domain-list"))
              {
                // console.log("Change Display");
                //   if(this.props.i>7)
                //    {
                //     document.getElementById("domain-list").style.display="flex";
                //    }
                // console.log(this.props.domains);
                // document.getElementById("domain-list").style.display="flex";
                document.getElementById("domain-list").style.display="none";
                // document.getElementById("domain-list").style.display="flex";
              }
         }
        // console.log(process.env.REACT_APP_RECAPTCHA_KEY);
         return(
            //  <div className="question__main__container">
            //     <img src={ieeeLogo} alt=""/>
            //     <button type="button" onClick={()=>{
            //         var resp=this.props.decrementI();
            //         if(resp!=="Overflow" && resp!=="Underflow")
            //          {
            //             this.clearInput("");
            //             var a=this.props.currentAnswer("decrement");
            //             this.clearInput(a);
            //          }
            //     }}>^</button>
            //     <button type="button"onClick={()=>{
            //         var resp=this.props.incrementI();
            //         if(resp!=="Overflow" && resp!=="Underflow")
            //          {
            //             var a=this.props.currentAnswer("increment");
            //             // this.clearInput("");
            //             this.clearInput(a);   
            //          }
            //     }}>v</button>
            //     <div className="questionHeader">{this.props.question}</div>
            //     <textarea id="textArea" type="text" rows={"10"} columns={"10"} placeholder={"Type here"} onChange={this.props.changeAnswer}/>
            //     {this.props.showDomains
            //     ?
            //     <div>
            //         <div>Technical</div>
            //         <button type="button" onClick={()=>this.props.addDomains("ML")}>ML</button>
            //         <button type="button" onClick={()=>this.props.addDomains("Web Dev")}>Web Dev</button>
            //         <button type="button" onClick={()=>this.props.addDomains("CC")}>Competitive Coding</button>
            //         <div>Management</div>
            //         <button type="button" onClick={()=>this.props.addDomains("Sponsorship")}>Sponsorship</button>
            //         <button type="button" onClick={()=>this.props.addDomains("Opeartions")}>Opeartions</button>
            //         <button type="button" onClick={()=>this.props.addDomains("Finance")}>Finance</button>
            //         <button type="button" onClick={()=>this.props.addDomains("Relations")}>Relations</button>
            //         <div>Design</div>
            //         <button type="button" onClick={()=>this.props.addDomains("UI")}>UI/UX designer</button>
            //         <button type="button" onClick={()=>this.props.addDomains("Poster")}>Poster, placard designing</button>
            //         <button type="button" onClick={()=>this.props.changePage("thankYouPage")}>Submit</button>
            //         <button type="button" onClick={()=>this.props.resetDomains()}>Reset Domains</button>
            //     </div>
            //     :
            //     <div></div>
            //     }
            //     <img src={recruitments} alt="" style={{"background-color": "black"}}/>
            //     <img src={fbLogo} alt="" />
            //     <img src={instaLogo} alt="" />
            //     <img src={ieeeLogo1} alt=""/>
            //     <img src={background} alt=""/>
            //  </div>

            //sarthak-css
            <div>
                <img className="ques-man" src={background} alt="background_image"/>
                <div className="ques-mainPage">
                    <img className="ques-white-logo" src={ieeeLogo} alt="IEEE-VIT_logo"/>
                    <div id="domain-list" className="domain-list hidden-div">
                    {
                    this.props.showDomains
                    ?this.props.domains.map((data, i)=>{
                        if(data)
                         {return(<div key={i} className="domain-list-element">{data}</div>);}
                        else
                         {return(<div></div>);}
                    })
                    :<div></div>
                    }
                    </div>
                    <div className="ques-container">
                        <img className="ques-up" src={down} onClick={()=>{
                            var resp=this.props.decrementI();
                            // console.log(resp);
                            if(resp!=="Overflow" && resp!=="Underflow")
                            {
                                this.clearInput("");
                                var a=this.props.currentAnswer("decrement");
                                this.clearInput(a);
                            }
                            var b=this.props.textAreaUnhide();                           
                            if(b)
                             {
                                document.getElementById("textArea").style.display="block";
                             }
                        }} alt=""/>
                        <p className="ques-text">{this.props.question}</p>
                        {
                            this.props.i>5
                            ?<textarea id="textArea" wrap="physical" className="ques-area" onChange={this.props.changeAnswer}></textarea>
                            :<input id="textArea" className="ques-area-small" onChange={this.props.changeAnswer} />
                        }
                        {this.props.showDomains
                        ?
                        <div>
                            <div className="sec-name">Technical</div>
                            <div className="sec-container">
                            <button className="sec-name-btn" type="button" onClick={()=>this.props.addDomains("ML")}>Machine Learning</button>
                            <button className="sec-name-btn" type="button" onClick={()=>this.props.addDomains("WebDev")}>Web Development</button>
                            <button className="sec-name-btn" type="button" onClick={()=>this.props.addDomains("AppDev")}>App Development</button>
                            <button className="sec-name-btn" type="button" onClick={()=>this.props.addDomains("Electronics")}>Electronics</button>
                            <button className="sec-name-btn" type="button" onClick={()=>this.props.addDomains("CyberSec")}>Cyber Security</button>
                            <button className="sec-name-btn" type="button" onClick={()=>this.props.addDomains("CompetitiveCoding")}>Competitive Coding</button>
                            </div>
                            <div className="sec-name">Management</div>
                            <div className="sec-container">
                            <button className="sec-name-btn" type="button" onClick={()=>this.props.addDomains("SponsorshipAndFinance")}>Sponsorship and Finance</button>
                            <button className="sec-name-btn" type="button" onClick={()=>this.props.addDomains("Outreach")}>Outreach</button>
                            <button className="sec-name-btn" type="button" onClick={()=>this.props.addDomains("Relations")}>Relations</button>
                            <button className="sec-name-btn" type="button" onClick={()=>this.props.addDomains("Documentation")}>Documentation</button>
                            <button className="sec-name-btn" type="button" onClick={()=>this.props.addDomains("SocialMediaAndMarketing")}>Social Media and Marketing</button>
                            </div>
                            <div className="sec-name">Design</div>
                            <div className="sec-container">
                            <button className="sec-name-btn" type="button" onClick={()=>this.props.addDomains("UI")}>UI/UX design</button>
                            <button className="sec-name-btn" type="button" onClick={()=>this.props.addDomains("Poster")}>Poster, placard designing</button>
                            <button className="sec-name-btn" type="button" onClick={()=>this.props.addDomains("VFX")}>VFX</button>
                            </div>
                            <br />
                            <div className="recaptcha">
                                <Recaptcha
                                    sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
                                    render="explicit"
                                    // type="v3"
                                    verifyCallback={this.verifyCallback}
                                    onloadCallback={this.callback}
                                />
                            </div>
                            <button className="sec-name-btn" style={{ "backgroundColor": "green", "marginTop": "20px", "marginRight": "10px", "outline": "none", "cursor": "pointer"}} type="button" onClick={()=>this.props.changePage("thankYouPage", this.state.isVerified, this.state.token)}>Submit</button>
                            <button className="sec-name-btn" style={{ "backgroundColor": "red", "marginTop": "20px", "marginLeft": "10px", "outline": "none", "cursor": "pointer"}} type="button" onClick={()=>this.props.resetDomains()}>Reset Domains</button>
                        </div>
                        :
                        <div></div>
                        }
                        <img className="ques-down" src={down} onClick={()=>{
                            var resp=this.props.incrementI();
                            // console.log(resp);
                            if(resp!=="Overflow" && resp!=="Underflow")
                            {
                                var a=this.props.currentAnswer("increment");
                                // this.clearInput("");
                                this.clearInput(a);
                            }
                            if(resp==="Overflow")
                             {
                                var b=this.props.textAreaHide();
                                //console.log(b);
                                if(b)
                                 {
                                    document.getElementById("textArea").style.display="none";
                                 }
                             }
                            //console.log();
                        }} alt=""/>
                    </div>
                    <div className="ques-footer">
                        <div>
                            <img className="ques-social" src={newtwit} alt="twitter" onClick={()=>{
                                // console.log("Hello!");
                                window.location.assign("https://twitter.com/ieeevitvellore?s=08");
                            }}/>
                        </div>
                        <a href="https://www.facebook.com/IEEEVIT/"><img className="ques-social" src={fbLogo} alt="facebook" /></a>
                        <a href="https://www.instagram.com/ieeevitvellore/?hl=en"><img className="ques-social" src={instaLogo} alt="instagram" /></a>
                        <a href="https://github.com/IEEE-VIT"><img className="ques-social" src={github} alt="github"/></a>
                        <a href="https://in.linkedin.com/company/ieee-vit"><img className="ques-social" src={linked} alt="linked" /></a>
                        <a href="https://ieeevit.com/"><img className="ques-social" src={www} alt="www" /></a>
                    </div>
                </div>
            </div>
            // <img src={ieeeLogo} alt=""/>
            // <div className="questionHeader">{this.props.question}</div>
            // <textarea type="text" rows={"10"} columns={"10"} placeholder={"Type here"}/>
            // <img src={recruitments} alt="" style={{"background-color": "black"}}/>
            // <img src={fbLogo} alt="" />
            // <img src={instaLogo} alt="" />
            // <img src={ieeeLogo1} alt=""/>
            // <img src={background} alt=""/>
         );
     }
}

export default QuestionPage;