import React from 'react';
import cookie from 'react-cookies';

import './SecondInterview.css'
import CardList from '../../components/CardList/CardList';
class SecondInterview extends React.Component {
    constructor() {
        super();
        this.state={
            candidateDetails: false,
            candidates:[],
            loading: false,
            round_1_comments: ""
        }
    }

    changeView = () => {
        console.log("Changing");
        this.setState({
            candidateDetails: true
        });
    }

    componentWillMount() {
        this.setState({
            "loading": false
        });
        fetch(`${process.env.REACT_APP_API_URL}/candidate/list/interviewer_switched_candidates`,{
            method:"get",
            headers: {
                "Content-Type":"application/json",
                "Accept-Encoding": "gzip, deflate",
                "Authorization": "token "+cookie.load('token').token
            },
            // mode: "no-cors"
        })
            .then(response=>{
                if(response.status===401)
                 {
                     alert("Token expired!");
                     window.location.href="/login";
                 }
                else if(response.status===400){
                    alert("Error!");
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
                this.setState({candidates: data.interviewer_switched_candidates});
                // this.setState({round_1_comments: data.interviewer_switched_candidates[0].round_1_comment});
                console.log("Mai idhar hu! Plz dekho idhar!");
                console.log("Comments: "+data.round_1_comment);//this.state.round_1_comments
                // console.log(this.state.candidates);
            })
            .catch((err) => {
                console.log("Error!");
                console.log(err);
                this.setState({error:true})
                // alert('Session expired. Please login again.');
            }); 
    }

    render() {
        let searchField=""
        const {candidates} = this.state;
        if(this.state.loading)
         {
             return (<h1>Loading...</h1>);
         }
        if(!candidates){
            return <h1 className='loading'>No candidates available.</h1>
        } else {
            const filteredCandidate = candidates.filter(candidate => {
                return candidate.name.toLowerCase().includes(searchField.toLowerCase());
            });
            console.log(this.state.round_1_comments);
        return(
            <div className='secondinterview'>
                <h1>Interview switch</h1>
                <button type="button" onClick={()=>{
                    window.location.href="/candidateList";
                }}>Back</button>
                <button className='logout' onClick={()=>{
                    cookie.remove('domain');
                    cookie.remove('token');
                    window.location.href="/login";
                }}>Logout</button>
                <CardList people={filteredCandidate} changeView={this.changeView}/>
                {/* {
                    !this.state.round_1_comments
                    ?<h1>ROUND 1 COMMENTS</h1>
                    :<div></div>
                }
                {
                    !this.state.round_1_comments
                    ?<p>{this.state.round_1_comments}</p>
                    :<div></div>
                } */}
            </div>
        )}
    }
}

export default SecondInterview;