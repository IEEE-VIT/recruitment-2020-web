import React from 'react';
import cookie from 'react-cookies';

import './chooseRole.css';

class ChooseRole extends React.Component {
    constructor() {
        super();
        this.state={
            id:"",
            is_interviewer:false,
            is_moderator:false,
            room_no:""
        }
    }
    componentWillMount() {
        if(document.cookie.indexOf('token')===-1)
        {
            console.log("Redirecting!");
            window.location.href="/login";
        }

        fetch(`${process.env.REACT_APP_API_URL}/recruiter/users/get_logged_in_user`,{
            method:"post",
            headers: {
                "Authorization": "token "+cookie.load('token').token
            }
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
        .then((response) => response.json())
        .then((data) => this.setState({id:data.user_id}))
        .then(()=>console.log(this.state.id))
    }
    

    forInterviewer = async () => {
        await this.setState({is_interviewer:true})
        console.log(this.state.room_no)
        await console.log(this.state.is_interviewer)
        await console.log(this.state.is_moderator)
        await fetch(`${process.env.REACT_APP_API_URL}/recruiter/users/${this.state.id}`,{
            method:"PATCH",
            headers: {
                "Content-Type":"application/json",
                "Accept-Encoding": "gzip, deflate",
                "Authorization": "token "+cookie.load('token').token
            },
            body: JSON.stringify({
                is_interviewer:this.state.is_interviewer,
                is_moderator:this.state.is_moderator,
                room_no:this.state.room_no
            })
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
            .then(window.location.href="/candidateList")
            .catch((err) => {
                console.log("Error!");
                console.log(err);
                this.setState({error:true})
                // alert('Session expired. Please login again.');
            });
    }

    forModerator = async () => {
        await this.setState({is_moderator:true})
        await fetch(`${process.env.REACT_APP_API_URL}/recruiter/users/${this.state.id}`,{
            method:"PATCH",
            headers: {
                "Content-Type":"application/json",
                "Accept-Encoding": "gzip, deflate",
                "Authorization": "token "+cookie.load('token').token
            },
            body: JSON.stringify({
                is_interviewer:this.state.is_interviewer,
                is_moderator:this.state.is_moderator,
                room_no:this.state.room_no
            })
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
            .then(window.location.href="/moderator")
            .catch((err) => {
                console.log("Error!");
                console.log(err);
                this.setState({error:true})
                // alert('Session expired. Please login again.');
            });
    }
     
    render(){
        return(
            <div className="btn-container">
                <input type="text" placeholder='Enter room no' onChange={event => this.setState({room_no: event.target.value})} ></input>
                <button className="btn-interviewer" onClick={()=>{this.forInterviewer()}}>Interviewer</button>
                <div className="div-seperation">OR</div>
                <button className="btn-moderator" onClick={()=>{this.forModerator()}}>Moderator</button>
            </div>
        );
    }
}

export default ChooseRole;