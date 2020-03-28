import React from 'react';
import {Card, Accordion, Button} from 'react-bootstrap';
import cookie from 'react-cookies';

import './Project.css';
import Technical from '../Technical/Technical';
import Management from '../Management/Management';
import Design from '../Design/Design';

class Project extends React.Component {
    constructor() {
        super();
        this.state={
            project:[],
            projectSelected:"",
            projectid:"",
            projectmodification:"",
            loading: false
        }
    }
    changeProject=(a)=>{
        // console.log("Change Project",a);
        this.setState({
            "projectSelected": a
        });
    }
    changeProjectId=(a)=>{
        // console.log("Change Project",a);
        this.setState({
            "projectid": a
        });
    }
    onProjectClick = () => {
        this.setState({
            "loading": true
        });
        fetch(`${process.env.REACT_APP_API_URL}/project_templates?domain=${this.state.project}`,{
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
                 alert("Token Expired");
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
                project: resp.results
            });
            console.log(resp);
        });
    }

    onProjectSubmit = () => {
        console.log('Hellooo')
        console.log(this.state.projectid);
        console.log(this.props.id);
        console.log(parseInt(this.props.id));
        console.log(this.state.projectmodification);
        let formData = new FormData();
        formData.append('applicant_id', parseInt(this.props.id));
        formData.append('project_template_id', `${this.state.projectid}`);
        formData.append('modification_body', `${this.state.projectmodification}`);
        this.setState({
            "loading": true
        });
        fetch(`${process.env.REACT_APP_API_URL}/project_templates/assign`,{
            method: "post",
            //mode:"no-cors",
            headers: {
                "Content-Type":"application/json",
                "Accept-Encoding": "gzip, deflate",
                "Authorization": "Token "+cookie.load('token').token
            },
            body: JSON.stringify({
                    applicant_id:parseInt(this.props.id),
                    project_template_id:this.state.projectid,
                    modification_body:this.state.projectmodification
                })
        })
        .then((response)=>{
            if(response.status===401)
             {
                 alert("Token Expired");
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
                project: resp.results
            });
            console.log(resp);
        })
        .then(window.location.href='/candidateList')
    }

    render() {
        if(this.state.loading)
         {
             return(<h1>Loading...</h1>);
         }
        return(
            <div className='project'>
                <Accordion defaultActiveKey="0">
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="3">
                            Technical
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="3">
                        <Card.Body><Technical changeProject={this.changeProject} changeProjectId={this.changeProjectId} projectid={this.state.projectid}/></Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="1">
                            Management
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                    <Card.Body><Management changeProject={this.changeProject} changeProjectId={this.changeProjectId} /></Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="2">
                            Design
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="2">
                    <Card.Body><Design changeProject={this.changeProject} changeProjectId={this.changeProjectId} /></Card.Body>
                    </Accordion.Collapse>
                </Card>
                </Accordion>
                <h2>PROJECT MODIFICATIONS</h2>
                <textarea
                    rows="5" 
                    className='comment' 
                    placeholder='Type here' 
                    onChange={event => this.setState({projectmodification: event.target.value})} 
                />
                <button className='accept' onClick={()=> this.onProjectSubmit()} >SUBMIT</button>
            </div>
        )
    }
}

export default Project;