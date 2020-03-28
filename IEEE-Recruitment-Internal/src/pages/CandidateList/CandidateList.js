import React from 'react';
import cookie from 'react-cookies';

import './CandidateList.css';
import SearchBox from '../../components/SearchBox/SearchBox';
import CardList from '../../components/CardList/CardList';
// import Header from '../../components/Header/Header';
// import CandidateCard from '../../components/CandidateCard/CandidateCard';

class CandidateList extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            searchField:"",
            error:"",
            candidateDetails: false,
            loading: false,
            round_1_comment: "",
            candidates:[]
            // candidates:[
            //     {
            //         "name":"Ziyan",
            //         "reg_no": "18BCE526",
            //         "domains": "ML, Web Dev",
            //         "id": "1"
            //     },
            //     {
            //         "name":"Fenil",
            //         "reg_no": "18BCE526",
            //         "domains": "ML, Web Dev, App Dev",
            //         "id": "2"
            //     },
            //     {
            //         "name":"Mayank",
            //         "reg_no": "18BCE526",
            //         "domains": "Everything",
            //         "id": "3"
            //     },
            //     {
            //         "name":"Sameeran",
            //         "reg_no": "18BCE526",
            //         "domains": "Basic django",
            //         "id": "4"
            //     },
            // ]
        };
    };
    changeView=(a)=>{
        console.log("Changing");
        this.setState({
            candidateDetails: a
        });
    }
    componentDidUpdate()
     {
        // document.addEventListener('DOMContentLoaded', function() {
        //     // your code here
        //     // console.log('After document Load');
        //     // console.log(this.state);
        //  }, false);
     }
    componentWillMount() {
        if(document.cookie.indexOf('token')===-1)
          {
              console.log("Redirecting!");
              window.location.href="/login";
          }
        else{
            if(document.cookie.indexOf('domain')===-1)
             {
                // alert("Please select your domain");
                // window.location.href="/domain";
                const expires = new Date();
                expires.setDate(Date.now() + 1000 * 60 * 60 * 1);
                cookie.save('domain', JSON.stringify({domain: "ML", candidateDetails: false}),{
                      expires
                });
             }
            else
             {
                const expires = new Date();
                expires.setDate(Date.now() + 1000 * 60 * 60 * 1);
                cookie.save('domain', JSON.stringify({domain: cookie.load('domain').domain, candidateDetails: cookie.load('domain'.candidateDetails)}),{
                      expires
                });
             }
        }
        //   const expires = new Date();
        //   expires.setDate(Date.now() + 1000 * 60 * 60 * 1);
        //   cookie.save('domain', JSON.stringify({domain: cookie.load('domain').domain, candidateDetails: false}),{
        //       expires
        //   });
        setTimeout(function()
          {
              console.log("Reloading");
              if(cookie.load('domain').candidateDetails)
               {
                  console.log("I will not reload!");
               }
              else {
                //   window.location.reload(1);
              }
          }, 10000);
        var a;
        console.log("Domain: "+document.cookie.indexOf('domain'));
        if(document.cookie.indexOf('domain')===-1)
         {
             a="ML";
         }
        else
         {
             a=cookie.load('domain').domain;
         }
        this.setState({
            "loading": true
        });
        fetch(`${process.env.REACT_APP_API_URL}/candidate/list?interest=`+a,{
            method:"get",
            headers: {
                "Content-Type":"application/json",
                "Accept-Encoding": "gzip, deflate",
                "Authorization": "token "+cookie.load('token').token
            },
            // mode: "no-cors"
        })
        .then((response)=>{
            if(response.status===401)
             {
                 alert("Token expired!");
                 window.location.href="/login";
             }
            this.setState({
                "loading": false
            });
            return response;
        })
            .then(Response => Response.json())
            .then(data => {
                // console.log(data);
                // console.log(this.props.domainreq);
                this.setState({candidates: data});
                console.log(data);
                
            })
            .catch((err) => {
                console.log("Error!");
                console.log(err);
                this.setState({error:true})
                // alert('Session expired. Please login again.');
            });
}

    onSearchChange = (event) => {
        this.setState({searchField: event.target.value});
    }

    changeDropDownDomain=(event)=>{
        console.log(event.target.value);
        if(event.target.value==="None")
         {
             alert("Please choose a domain");
         }
        // this.props.changeDomain(event.target.value);
        const expires = new Date();
        expires.setDate(Date.now() + 1000 * 60 * 60 * 1);
        cookie.save('domain', JSON.stringify({domain: event.target.value}),{
            expires
        });
        // window.location.reload();
    }

    render() {
        const {searchField, candidates} = this.state;
        // const filteredCandidate=candidates;
        if(document.cookie.indexOf('domain')===-1)
         {
             return(
                 <div>
                    <button className='back' onClick={()=>{
                        if(this.state.candidateDetails)
                        {
                            window.location.href="/candidateList";
                        }
                        else {
                            window.location.href="/role";
                        }
                    }}>Back</button>
                    <button className='logout' onClick={()=>{
                        cookie.remove('domain');
                        cookie.remove('token');
                        window.location.href="/login";
                    }}>Logout</button>
                    <h1>Please choose a domain</h1>
                </div>
             );
         }
         if(this.state.loading){
            return (
            <h1 className='loading'>Loading...</h1>
            );
        // if(candidates.length === 0){
        //     return (
        //     <h1 className='loading'>No candidates available.</h1>
        //     );
        } else {
            const filteredCandidate = candidates.filter(candidate => {
                return(candidate.name.toLowerCase().includes(searchField.toLowerCase()));
            });
            return (
            <div className=''>
                <button className='back' onClick={()=>{
                    if(this.state.candidateDetails)
                     {
                        window.location.href="/candidateList";
                     }
                    else {
                        window.location.href="/role";
                    }
                }}>Back</button>
                <button className='change' onClick={()=>window.location.href='/secondInterviewList'}>Interview Switch</button>
                <button className='logout' onClick={()=>{
                    cookie.remove('domain');
                    cookie.remove('token');
                    window.location.href="/login";
                }}>Logout</button>
                {this.state.candidateDetails
                ?
                <div></div>
                :
                <div className="main-container">
                    <SearchBox searchChange={this.onSearchChange}/>
                    <div className='lol'>
                        <select className="select" onChange={this.changeDropDownDomain}>
                            <option>None</option>
                            <option>ML</option>
                            <option>WebDev</option>
                            <option>AppDev</option>
                            <option>Electronics</option>
                            <option>CyberSec</option>
                            <option>CompetitiveCoding</option>
                            <option>SponsorshipAndFinance</option>
                            <option>Outreach</option>
                            <option>SocialMediaAndMarketing</option>
                            <option>Documentation</option>
                            <option>Relations</option>
                            <option>UI</option>
                            <option>VFX</option>
                            <option>Poster</option>
                        </select>
                    </div>
                </div>
                }
                <CardList people={filteredCandidate} changeView={this.changeView}/>
            </div>
            );
        }
        // return(
        //     <div className='candidatelist'>
        //         <Header />
        //         <h1> candidatelist </h1>
        //         <input className='searchbox' type='search' placeholder='Search Candidate'/>
        //         <CandidateCard />
        //     </div>
        // )
    }
}

export default CandidateList;