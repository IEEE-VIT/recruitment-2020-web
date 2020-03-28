import React from 'react';
import cookie from 'react-cookies';

import './InterDomSelect.css';
import CandidateList from '../CandidateList/CandidateList';

class InterDomSelect extends React.Component {
    constructor() {
        super();
        this.state={
            domainreq:"",
            domPresent:false
        }
    }

    componentWillMount()
     {
        if(document.cookie.indexOf('token')===-1)
          {
              console.log("Redirecting!");
              window.location.href="/login";
          }
        // const expires = new Date();
        // expires.setDate(Date.now() + 1000 * 60 * 60 * 1);
        // cookie.save('token', JSON.stringify({token: ""}),{
        //     expires
        // });
     }

    domainPresent = () => {
        if(this.state.domainreq !== "")
            {this.setState({domPresent:true}, () => window.location.href="/candidateList");
        }
    }

    storeCookie=()=>{
        console.log(this.state.domainreq);
        const expires = new Date();
        expires.setDate(Date.now() + 1000 * 60 * 60 * 1);
        cookie.save('domain', JSON.stringify({domain: this.state.domainreq}),{
            expires
        });
    }

    changeDomain=(a)=>{
        console.log(a);
        this.setState({
            "domainreq": a
        }, this.storeCookie());
    }

    render() {
        return(
            <div className='interdomselectt'>
                { this.state.domPresent ? 
                    <CandidateList domainreq={this.state.domainreq} changeDomain={this.changeDomain}/> 
                :
                    <div>
                        <h1><strong>DOMAINS</strong></h1>
                        <button className='back' onClick={()=>{
                            window.location.href="/role";
                        }}>Back</button>
                        <button className='logout' onClick={()=>{
                            cookie.remove('domain');
                            cookie.remove('token');
                            window.location.href="/login";
                        }}>Logout</button>
                        <div className="btn-containerr">
                            <br />
                        <div className="domain-container">
                            <h3 className="domain-heading">Technical:</h3>
                            <div className='domain-list-container'>
                                <button className="btn-domain" onClick={async ()=>{this.setState({domainreq:"ML"},await this.storeCookie(),await this.domainPresent())}} >Machine Learning</button>
                                <button className="btn-domain" onClick={()=>{this.setState({domainreq:"WebDev"},this.storeCookie(),this.domainPresent())}} >Web Development</button>
                                <button className="btn-domain" onClick={()=>{this.setState({domainreq:"AppDev"},this.storeCookie(),this.domainPresent())}} >App Development</button>
                                <button className="btn-domain" onClick={()=>{this.setState({domainreq:"Electronics"},this.storeCookie(),this.domainPresent())}} >Electronics</button>
                                <button className="btn-domain" onClick={()=>{this.setState({domainreq:"CyberSec"},this.storeCookie(),this.domainPresent())}} >Cyber Security</button>
                                <button className="btn-domain" onClick={()=>{this.setState({domainreq:"CC"},this.storeCookie(),this.domainPresent())}}>Competitive Coding</button>
                            </div>
                            </div>
                            <div className="domain-container">
                            <h3 className="domain-heading">Management:</h3>
                            <div className='domain-list-container'>
                                <button className="btn-domain" onClick={()=>{this.setState({domainreq:"Sponsorship"},this.storeCookie(),this.domainPresent())}} >Sponsorship and Finance</button>
                                <button className="btn-domain" onClick={()=>{this.setState({domainreq:"Outreach"},this.storeCookie(),this.domainPresent())}} >Outreach</button>
                                <button className="btn-domain" onClick={()=>{this.setState({domainreq:"Social"},this.storeCookie(),this.domainPresent())}} >Social Media and Marketing</button>
                                <button className="btn-domain" onClick={()=>{this.setState({domainreq:"Documentation"},this.storeCookie(),this.domainPresent())}} >Documentation</button>
                                <button className="btn-domain" onClick={()=>{this.setState({domainreq:"Relations"},this.storeCookie(),this.domainPresent())}} >Relations</button>
                            </div>
                            </div>
                            <div className="domain-container">
                            <h3 className="domain-heading">Design:</h3>
                            <div className='domain-list-container'>
                                <button className="btn-domain" onClick={()=>{this.setState({domainreq:"UI"},this.storeCookie(),this.domainPresent())}} >UI/UX design</button>
                                <button className="btn-domain" onClick={()=>{this.setState({domainreq:"VFX"},this.storeCookie(),this.domainPresent())}} >VFX</button>
                                <button className="btn-domain" onClick={()=>{this.setState({domainreq:"Pos"},this.storeCookie(),this.domainPresent())}} >Poster</button>
                            </div>
                        </div>
                    </div>
                    <button className='btn-domain' onClick={() => window.location.href='/secondInterviewList'}>Second Interview</button>
                </div>
                }
            </div>
        )
    }
}

export default InterDomSelect;