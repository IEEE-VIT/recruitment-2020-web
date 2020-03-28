import React from 'react';
import {withRouter} from 'react-router-dom';

import './CandidateCard.css';
import Candidate from '../Candidate/Candidate.js';

class CandidateCard extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            id:"",
            candidateSelect:false,
            // name:"",
            // reg_no:"",
            // email:"",
            // contact:"",
            // room_number:"",
            // answers:["","",""],
            // comment:"",
            // domains:"", //ML,Design,Management,Web Dev
            // loaded: false,
            // call:false,
            // projectmodification:"",
            // accept:false,
            // splitDomains:[],
            // interSelectDomains:[]
        };
    };

    onClickDiv=()=>{
        this.setState({candidateSelect:true});
        console.log("ID: "+this.props.id);
        console.log("Type(ID): "+typeof(this.props.id));
        this.props.changeClickedId(this.props.id);
        // fetch(`http://recruitment-backend-19.herokuapp.com/candidate/1`,{
        //     method:"get",
        //     headers: {
        //         "Content-Type":"application/json",
        //         "Accept-Encoding": "gzip, deflate",
        //         "Authorization": "Token 31ce9088f8e2eaf2972ec4a6f38bcdbd94bbc7a7"
        //     },
        //     // mode: 'no-cors',
        // })
        //     .then(Response => Response.json())
        //     .then(data => {
        //         this.setState({candidates: data})});
        // // console.log(this.state.candidates);
        // this.props.history.push({
        //     pathname: '/candidate',
        //     state: {
        //     id:"",
        //     name:"",
        //     reg_no:"",
        //     email:"",
        //     contact:"",
        //     room_number:"",
        //     answers:["","", ""],
        //     comment:"",
        //     domains:"", //ML,Design,Management,Web Dev
        //     loaded: false,
        //     call:false,
        //     projectmodification:"",
        //     accept:false,
        //     splitDomains:[],
        //     interSelectDomains:[]
        //     }
        //   });
        // window.location.href="/candidate";
    }
    render() {
        const { reg_no, name, domains } = this.props;
        return(
            <div>
                {this.state.candidateSelect ?
                    <Candidate id={this.props.id} changeView={this.props.changeView}/>
                :
                    <div className='candidatecard' onClick={this.onClickDiv} id={this.props.id}>
                        <h4 className="highlight">{name}</h4>
                        <h4>{reg_no}</h4>
                        <h4>{domains}</h4>
                    </div>
                }
            </div>
        )
    }
}

export default withRouter(CandidateCard);