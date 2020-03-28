import React from 'react';
import cookie from 'react-cookies';

import './Moderator.css';
import ModeratorRow from '../../components/ModeratorRow/ModeratorRow';

class Moderator extends React.Component {
    constructor() {
        super();
        this.state={
            answer:[],
            // "answer": [
            //     {
            //         name: "Ziyan Karmali",
            //         reg_no: "18BCI0272",
            //         interviewerName: "Agrim Bhaiya",
            //         interviewerRoomNo: "205"
            //     },
            //     {
            //         name: "Fenil Jain",
            //         reg_no: "18BCI0265",
            //         interviewerName: "Mayank Bhaiya",
            //         interviewerRoomNo: "201"
            //     },
            //     {
            //         name: "Ziyan Karmali",
            //         reg_no: "18BCI0272",
            //         interviewerName: "Agrim Bhaiya",
            //         interviewerRoomNo: "205"
            //     }
            // ],
           changeRoomNo: "",
           moderatorRoomNo: 1,
           loading: false
        }
    }

    componentWillMount=()=>{
        var a=1;
        if(document.cookie.indexOf('token')===-1)
          {
              console.log("Redirecting!");
              window.location.href="/login";
          }
        if(document.cookie.indexOf('moderatorRoomNo')===-1)
         {
            const expires = new Date();
            expires.setDate(Date.now() + 1000 * 60 * 60 * 1);
            cookie.save('moderatorRoomNo', JSON.stringify({moderatorRoomNo: 1}),{
                  expires
            });
         }
        else
         {
             console.log("COokire value: "+JSON.stringify(cookie.load('moderatorRoomNo')));
             a=cookie.load('moderatorRoomNo').moderatorRoomNo;
         }
        setTimeout(()=>{
            console.log("reloading!");
            window.location.reload(1);
        }, 10000);
        console.log(a);
        this.setState({
            "loading": true
        });
        let a;
        if(cookie.load('domain'))
         {
             a=cookie.load('domain').moderatorRoomNo;
         }
        else {
            a=1;
        }
        console.log("Room Nufghmjk:" +cookie.load('domain').moderatorRoomNo);
        fetch(`${process.env.REACT_APP_API_URL}/candidate/list?room_no=${a}`,{
            method: "get",
            //mode:"no-cors",
            headers: {
                // "room_no": this.state.moderatorRoomNo
                "Authorization": "Token "+cookie.load('token').token
            },
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
        .then((resp)=>{
            this.setState({
                answer: resp//.results
            });
            console.log('Answer:',this.state.answer)
            console.log(resp.results);
        });
    }
        //Get the list of candaidates by using fetch here!
        // if(document.cookie.indexOf('token')!==-1){
        //     console.log("Cookie is stored!");
        // }
        // console.log(cookie.load('token').token);//something@1234
        // console.log(this.state.moderatorRoomNo);
    

    getList=()=>{
        // console.log(this.state.moderatorRoomNo);
        //Get the list of candaidates by using fetch here!
        // console.log("Here!");
        this.setState({
            "loading": true
        });
        fetch(`${process.env.REACT_APP_API_URL}/candidate/list?room_no=${this.state.moderatorRoomNo}`,{
            method: "get",
            //mode:"no-cors",
            headers: {
                // "room_no": this.state.moderatorRoomNo
                "Authorization": "Token "+cookie.load('token').token
            },
        })
        .then((response)=>{
            if(response.status===401)
             {
                 alert("Token Expired!");
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
        .then((resp)=>{
            this.setState({
                "answer": resp
            });
            console.log(resp);
        });
    }
    changeRoomNo=async (event)=>{
        console.log("Change Room No: "+document.getElementById('dropDown').value);
        var a=document.getElementById('dropDown').value;
        await this.setState({
            moderatorRoomNo: a//parseInt(event.target.value[event.target.value.length-1])
        });
        await this.getList();
        if(document.cookie.indexOf('moderatorRoomNo')===-1)
         {
             console.log("Cookie not present");
            // const expires = new Date();
            // expires.setDate(Date.now() + 1000 * 60 * 60 * 1);
            // cookie.save('moderatorRoomNo', JSON.stringify({moderatorRoomNo: 1}),{
            //       expires
            // });
         }
        else
         {
            const expires = new Date();
            expires.setDate(Date.now() + 1000 * 60 * 60 * 1);
            cookie.save('moderatorRoomNo', JSON.stringify({moderatorRoomNo: a}),{
                  expires
            });
         }
    }
    render() {
        if(this.state.loading)
         {
             return(<h1>Loading...</h1>);
         }
        return(
            <div>
                <div className="moderatorHeader">
                    Moderator View
                    <select id="dropDown" className="dropDown" onChange={this.changeRoomNo}>
                        <option>None</option>
                        <option>1</option>
                        <option>2</option>
                    </select>
                    <div className="button-container">
                        <button className='moderator-back nav-btn' onClick={()=>{
                            window.location.href="/role";
                        }}>Back</button>
                        <button className='moderator-logout nav-btn' onClick={()=>{
                            cookie.remove('domain');
                            cookie.remove('token');
                            window.location.href="/login";
                        }}>Logout</button>
                    </div>
                </div>


                <div className='moderator'>
                    {
                        this.state.answer.map(function(data){
                            console.log('dataaaaaaaaa',data);
                            return <ModeratorRow data={data}/>
                        })  
                    }
                </div>
            </div>
        )
    }
}

export default Moderator;
//adding comment to push