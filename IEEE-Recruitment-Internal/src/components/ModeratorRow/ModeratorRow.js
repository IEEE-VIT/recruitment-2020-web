import React from 'react';
import cookie from 'react-cookies';

import './ModeratorRow.css';

class ModeratorRow extends React.Component {
    constructor() {
        super();
        this.state={         
            id:"",   
            candidateName: "",
            reg_no: "",
            interviewerName: "",
            interviewerRoomNo: "",
            snoozedCount:"",
            loading: false
            // contact: ["9960331376"],
            // domains: ["ML,Design"]
        }
    }

    componentWillMount() {
        // console.log(this.props.data);
        console.log('inside moderator row',this.props.data);
        console.log('id',this.props.data.id)
        this.state={
            id:this.props.data.id,
            candidateName:this.props.data.name,
            reg_no:this.props.data.reg_no,
            interviewerName:this.props.data.called_by,
            interviewerRoomNo:this.props.data.called_to_room_no,
            snoozedCount:this.props.data.times_snoozed
        }
        // this.setState({
        //     id:this.props.data.id,
        //     candidateName:this.props.data.name,
        //     reg_no:this.props.data.reg_no,
        //     interviewerName:this.props.data.interviewerName,
        //     interviewerRoomNo:this.props.data.interviewerRoomNo
        // })
        console.log('inside id',this.state.id);
        console.log('inside id',this.state.candidateName);
        console.log(this.state.reg_no);
        console.log(this.state.interviewerName);
        console.log(this.state.interviewerRoomNo);
        // fetch(`${process.env.REACT_APP_API_URL}/updateCandidates`)
        //     .then(response => {
        //         if(response.status != 200) {
        //             return console.log("Bad request");
        //         }
        //         else{
        //             return response.json();
        //         }
        //     })
        //     .then(data = () => {
        //         data.map((candidate,i) => {
                    
        //         })
        //         this.setState({
        //             name:data.body[0].name,
        //             reg_no:data.body[0].reg_no,
        //             contact:data.body[0].contact,
        //             domains:data.body[0].domains,
        //         })
        //     })
    }

    onSnoozeClick = () => {
        console.log('Clicked snooze');
        this.setState({
            loading: true
        });
        fetch(`${process.env.REACT_APP_API_URL}/candidate/${this.state.id}/snooze`,{
            method: "post",
            headers: {
                "Content-Type":"application/json",
                "Accept-Encoding": "gzip, deflate",
                "Authorization": "Token "+cookie.load('token').token
            },
            body: {
                "candidate_id":this.state.id
            }
        })
        .then((response)=>{
            if(response.status===401)
             {
                 alert("Token expired!");
                 window.location.href="/login";
             }
             else if(response.status===200) {
                alert('Snoozed. Mail sent.');
                window.location.href='/moderator';
             }
             this.setState({
                loading: false
            }); 
            return response;
        })
        .catch(err => console.log(err));
    }

    onRemoveClick = () => {
        console.log('Remove clicked');
        this.setState({
            loading: true
        });
        fetch(`${process.env.REACT_APP_API_URL}/candidate/${this.state.id}/invalidate`,{
            method: "post",
            headers: {
                "Content-Type":"application/json",
                "Accept-Encoding": "gzip, deflate",
                "Authorization": "Token "+cookie.load('token').token
            },
            body: {
                "candidate_id":this.state.id
            }
        })
        // .then((response)=>{
        //     if(response.status===401)
        //      {
        //          alert("Token");
        //          window.location.href="/";
        //      }
        //     return response;
        // })
        .then((response)=>{
            if(response.status===401)
             {
                 alert("Token expired!");
                 window.location.href="/login";
             }
            else if(response.status===400){
                alert("Error!");
                window.location.reload(1);
            }
            else if(response.status===200)
             {
                this.setState({
                    loading: false
                });
             }
            return response;
        })
        .then(alert("Invalidated. Mail sent."))
        .then(window.location.href='/moderator');
    }

    render() {
        // console.log(this.state);
        if(this.state.loading) 
         {
             return(<h1>Loading...</h1>);
         }
        return(
            <div className="moderatorRows">
                <div className='row-container'>
                    <div className="rowGrid">
                        <div className="nameModerate">{this.state.candidateName}</div>
                        <div className="regModerate">{this.state.reg_no}</div>
                        <div className="interviewModerate">{this.state.interviewerName}</div>
                        <div className="interviewRoom">{this.state.interviewerRoomNo}</div>
                        {/* <div className="snoozecount">{this.state.snoozedCount}</div> */}
                        <button className='button-snooze' onClick={this.onSnoozeClick} >Snooze <div className="snoozecount">{this.state.snoozedCount}</div></button>
                        <button className='button-remove' onClick={this.onRemoveClick} >Remove</button>
                    </div>                    
                </div>
            </div>
        )
    }
    
}

export default ModeratorRow;