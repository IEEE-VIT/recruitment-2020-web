import React from 'react';
// import CALL from '../../assets/call.png';

import './Candidate.css';
import SelectedDomains from '../SelectedDomains/SelectedDomains';
import Header from '../Header/Header';
import Project from '../Project/Project';
import cookie from 'react-cookies';

class Candidiate extends React.Component {
    constructor(props) {
        super(props);
        // this.state=this.props.history.location.state;
        this.state={
            id:"",
            name:"",
            reg_no:"",
            email:"",
            contact:"",
            room_number:"",
            question1:"",
            question2:"",
            question3:"",
            answer1:"",
            answer2:"",
            answer3:"",
            comment:"",
            domains:"", //ML,Design,Management,Web Dev
            loaded: false,
            call:false,
            projectmodification:"",
            accept:false,
            splitDomains:[],
            interSelectDomains:[],
            projectSelected:"",
            loading: false
        }
    }

    componentWillMount () {
        // console.log(this.props.history.location.state);
        // console.log(this.state);
        // this.setState=this.props.history.location.state;
        // console.log(this.props.history.location.state);
        // console.log(this.state);
        // console.log(this.state.domains);
        // console.log(this.props.history.location.state.domains);
        // let splitDomains=(this.state.domains).split(",");
        // console.log(splitDomains);
        // console.log(this.props.id);
        const expires = new Date();
          expires.setDate(Date.now() + 1000 * 60 * 60 * 1);
          cookie.save('domain', JSON.stringify({domain: cookie.load('domain').domain, candidateDetails: true}),{
              expires
          });
        this.props.changeView(true);
        this.setState({
            "loading": true
        });
        fetch(`${process.env.REACT_APP_API_URL}/candidate/`+this.props.id,{
            method:"get",
            headers: {
                "Content-Type":"application/json",
                "Accept-Encoding": "gzip, deflate",
                "Authorization": "Token "+cookie.load('token').token
            }
        })
        .then((response)=>{
            if(response.status===401)
             {
                 console.log(response.body.detail);
                 alert("Token expired!");
                 window.location.href="/login";
             }
            else if(response.status===400)
             {
                 alert("Error!");
             }
             this.setState({
                "loading": false
            });
            return response;
        })
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                console.log(data.answer1_text);
                this.setState({
                    id:data.id,
                    name:data.name,
                    reg_no:data.reg_no,
                    contact:data.contact,
                    answer1:data.answer1_text,
                    answer2:data.answer2_text,
                    answer3:data.answer3_text,
                    room_number:data.room_number,
                    domains:data.interests,
                    question1:data.question1_text,
                    question2:data.question2_text,
                    question3:data.question3_text,
                    loaded:true,
                    comment: data.round_1_comment
                });
                console.log(data);
            })
            .catch(err => console.log(err));
    }

    addDomains = (e) => {
        // console.log(this.state.domains.split(","));
        if(this.state.interSelectDomains.length<2) {
            this.setState({
                interSelectDomains: [...this.state.interSelectDomains, e]
            });
        } else {
            console.log("Not more than 2!");
            console.log(this.state.interSelectDomains);
        }
    }

    resetDomains = () => {
        this.setState({
            interSelectDomains:[]
        })
        console.log("Reset")
    }

    onCallClick = () => {
        console.log('Calling');
        // this.setState({call:true});
        fetch(`${process.env.REACT_APP_API_URL}/candidate/${this.state.id}/call`,{
            method:"post",
            headers: {
                "Content-Type":"application/json",
                "Accept-Encoding": "gzip, deflate",
                "Authorization": "Token "+cookie.load('token').token
            }
        })
            .then(response => {
                if(response.status !== 200) {
                    return console.log("Candidate not called");
                }
                else if(response.status===401){
                    alert("Token expired!");
                    window.location.href="/login";
                }
                else {
                    return console.log("Candidate on the way!");
                }
                this.setState({
                "loading": false
            });
            })
            .then(() => {this.setState({call:true})})
    }

    onAccept = () => {
        console.log('Accept');
        this.setState({accept:true});
        // this.setState({
        //     "loading": false
        // });
        fetch(`${process.env.REACT_APP_API_URL}/candidate/${this.props.id}/accept`,{
            method: "post",
            headers: {
                "Content-Type":"application/json",
                "Accept-Encoding": "gzip, deflate",
                "Authorization": "token "+cookie.load('token').token
            },
            body: JSON.stringify({
                "round":1
            })
        })
        .then(console.log('Round 1 comment----->',this.state.comment),'entering patch')
        .then(fetch(`${process.env.REACT_APP_API_URL}/candidate/${this.props.id}`,{
            method: "PATCH",
            headers: {
                "Content-Type":"application/json",
                "Accept-Encoding": "gzip, deflate",
                "Authorization": "Token "+cookie.load('token').token
            },
            body: JSON.stringify({
                "round_1_comment": this.state.comment,
                "interests":this.state.interSelectDomains.join(', ')
                // "round_1_call": true,
                // "round_2_project_modification": this.state.projectmodification,
                // "round_2_project_template": this.state.projectSelected
            })
        })).then((response)=>{
            if(response.status===401)
             {
                 alert("Token expired");
                 window.location.href="/login";
             }
            else if(response.status===400){
                alert("Error!");
            }
            // this.setState({
            //     "loading": false
            // });
            return response;
        })
        .then(console.log('exiting patch'))
        .catch(function(err) {
            console.log(err);
        })
    }

    onReject = () => {
        console.log('Reject');
        this.setState({accept:false});
        this.setState({
            "loading": true
        });
        fetch(`${process.env.REACT_APP_API_URL}/candidate/${this.props.id}/reject`,{
            method: "post",
            headers: {
                "Content-Type":"application/json",
                "Accept-Encoding": "gzip, deflate",
                "Authorization": "Token "+cookie.load('token').token
            },
            body: JSON.stringify({
                "round": 1,
                
            })
        })
        .then((response)=>{
            if(response.status===401)
             {
                 alert("Token expired!");
                 window.location.href="/login";
             }
            else if(response.status===400)
             {
                 alert("Error!");
             }
            if(response.status===200)
             {
               if(document.cookie.indexOf('domain')!==-1)
                {
                    const expires = new Date();
                    expires.setDate(Date.now() + 1000 * 60 * 60 * 1);
                    cookie.save('domain', JSON.stringify({domain: cookie.load('domain').domain, candidateDetails: false}),{
                          expires
                    });
                }
             }
            this.setState({
                "loading": false
            });
            return response;
        })
        .then(console.log('Rejected!!!'))
        .then(window.location.href="/candidateList")
        .catch(function(err) {
            console.log(err);
        })
    }

    onSave=()=>{
        console.log("Enter Save!");
        this.setState({
            "loading": true
        });
        fetch(`${process.env.REACT_APP_API_URL}/candidate/${this.props.id}/send_to_another_interviewer`,{
            method: "post",
            headers: {
                "Content-Type":"application/json",
                "Accept-Encoding": "gzip, deflate",
                "Authorization": "Token "+cookie.load('token').token
            }
        })
        .then((response)=>{
            if(response.status===401)
             {
                 alert("Token expired!");
                 window.location.href="/login";
             }
            else if(response.status===400)
             {
                 alert("Error!");
             }
             this.setState({
                "loading": false
            });
            return response;
        })
        .then(fetch(`${process.env.REACT_APP_API_URL}/candidate/${this.props.id}`,{
            method: "PATCH",
            headers: {
                "Content-Type":"application/json",
                "Accept-Encoding": "gzip, deflate",
                "Authorization": "Token "+cookie.load('token').token
            },
            body: JSON.stringify({
                "round_1_comment": this.state.comment,
                // "domains":this.state.domains
            })
        }))
        .then((response)=>{
            if(response.status===200)
             {
               if(document.cookie.indexOf('domain')!==-1)
                {
                    const expires = new Date();
                    expires.setDate(Date.now() + 1000 * 60 * 60 * 1);
                    cookie.save('domain', JSON.stringify({domain: cookie.load('domain').domain, candidateDetails: false}),{
                          expires
                    });
                }
             }
            return response;
        })
        .then(alert('Saved!'))
        .then(()=>{window.location.href='/candidateList'})
        .catch(function(err) {
            console.log(err);
        })
    }
    // commentChange=(event)=>{
    //     console.log("Event: "+event.target.value);
    //     this.setState({round_1_comment: event.target.value});
    // }
    render() {
        const {name, reg_no, email, contact, room_number} = this.state;
        // console.log(name+" "+reg_no);
        let domainList = this.state.domains.split(", ").map(function(name){
            return <li className="domainList">{name}</li>;
        })
        
        // console.log(document.getElementById("interviewComment"));
        console.log(this.state.round_1_comment);
        if(document.getElementById("interviewComment")) 
         {
            document.getElementById("interviewComment").value=this.state.comment;
         }

        // return this.state.loaded?
        //      <h1>Loading...</h1>
        // :
        // if(this.state.loading)
        //  {
        //      return(<h1>Loading...</h1>);
        //  }
        return(
            <div>
                <Header />
            <div className='candidate'>
                <br />
                <div className='components'>
                    <div className='details'>
                        <h1>{name}</h1>
                        <h3>{reg_no}</h3>
                        <h3>{email}</h3>
                        <h3>{contact}</h3>
                        <h3>Room No: {room_number}</h3>
                        {/* <h3>Choosen domains:</h3>
                        <ol className="orderList">
                            {domainList}
                        </ol> */}
                        {this.state.call? 
                            <span> CALL HAS BEEN SENT</span> 
                        : 
                            <button className='call' onClick={()=>this.onCallClick()}>CALL</button> }
                    </div>
                    <br />

                    <div className='domain'>
                        <h2>DOMAIN</h2>
                        {this.state.interSelectDomains.join(", ")}
                        <SelectedDomains addDomains={this.addDomains} resetDomains={this.resetDomains} domains={this.state.domains.split(",")}/>
                    </div>
                    <br />

                    <div className='round1div'>
                        <h2>ROUND 1</h2>
                        {
                            <div className="parentResp">
                                <div className="resp">
                                    <p className='question'>Q. {this.state.question1}</p>
                                    <p className='answer'>A. {this.state.answer1}</p>
                                </div>
                                <div className="resp">
                                    <p className='question'>Q. {this.state.question2}</p>
                                    <p className='answer'>A. {this.state.answer2}</p>
                                </div>
                                <div className="resp">
                                    <p className='question'>Q. {this.state.question3}</p>
                                    <p className='answer'>A. {this.state.answer3}</p>
                                </div>
                            </div>
                        }
                    </div>
                    <br />
                    <div className='comments'>
                        <h2>INTERVIEWER COMMENTS</h2>
                        <textarea
                            rows="5" 
                            id="interviewComment"
                            className='commenters' 
                            placeholder='Type here' 
                            onChange={event => this.setState({comment: event.target.value})} 
                        />
                    </div>
                    <br />
                    <button className='save' onClick={()=> this.onSave()}>SAVE</button>
                    <div className='bottomFeac'>
                        <button className='accept' onClick={()=> this.onAccept()}>ACCEPT</button>
                        <button className='reject' onClick={()=> this.onReject()}>REJECT</button>
                    </div>

                    <br/>
                    {this.state.accept ? 
                        <div className='projects'>
                            <h2> PROJECTS </h2>
                            <Project id={this.state.id}/>
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                        </div>    
                    :
                        null        
                    }
                </div>
            </div>
        </div>
        )
    }
}

export default Candidiate;