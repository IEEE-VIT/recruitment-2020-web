import React from 'react';
import {Card, Accordion, Button} from 'react-bootstrap';
import cookie from 'react-cookies';


import './Management.css';

class Management extends React.Component {
    constructor() {
        super();
        this.state={
            domain:"",
            project1:"",
            project2:"",
            project3:"",
            project4:"",
            project5:"",
            projectSelected:"",
            projectid1:"",
            projectid2:"",
            projectid3:"",
            projectid4:"",
            projectid5:"",
            projectid6:"",
            // loading: false
        }
    }

    onProjectClick = async () => {
        await this.setState({
            project1:"",
            project2:"",
            project3:"",
            project4:"",
            project5:"",
            projectid1:"",
            projectid2:"",
            projectid3:"",
            projectid4:"",
            projectid5:"",
            projectid6:""
        })
        // this.setState({
        //     "loading": true
        // });
        await fetch(`${process.env.REACT_APP_API_URL}/project_templates?domain=${this.state.domain}`,{
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
            // this.setState({
            //     "loading": false
            // });
            return response;
        })
        .then(response => response.json())
        .then((resp)=>{
            this.setState({
                // project1: resp.results[0].title,
                // project2: resp.results[1].title,
                // project3: resp.results[2].title,
                // project4: resp.results[3].title,
                // project5: resp.results[4].title,
            });
            console.log(this.state.project);
        });
    }

    selectedProject1 = () => {
        this.setState({projectSelected:this.state.project1})
        this.props.changeProject(this.state.project1);
    }

    selectedProject2 = () => {
        this.setState({projectSelected:this.state.project2})
        this.props.changeProject(this.state.project2);
    }

    selectedProject3 = () => {
        this.setState({projectSelected:this.state.project3})
        this.props.changeProject(this.state.project3);
    }

    selectedProject4 = () => {
        this.setState({projectSelected:this.state.project4})
        this.props.changeProject(this.state.project4);
    }

    selectedProject5 = () => {
        this.setState({projectSelected:this.state.project5})
        this.props.changeProject(this.state.project5);
    }

    selectedProjectId1 = () => {
        this.props.changeProjectId(this.state.projectid1);
    }

    selectedProjectId2 = () => {
        this.props.changeProjectId(this.state.projectid2);
    }

    selectedProjectId3 = () => {
        this.props.changeProjectId(this.state.projectid3);
    }

    selectedProjectId4 = () => {
        this.props.changeProjectId(this.state.projectid4);
    }

    selectedProjectId5 = () => {
        this.props.changeProjectId(this.state.projectid5);
    }

    render() {
        // if(this.state.loading)
        //  {
        //      return(<h1>Loading...</h1>);
        //  }
        return(
            <div className='management'>
                <Accordion defaultActiveKey="0">
                <Card>
                    <Card.Header>
                        <Accordion.Toggle 
                            as={Button} 
                            onClick={async ()=>{
                                this.setState({domain:"SponsorshipAndFinance"})
                                await this.onProjectClick()}} 
                                variant="link" 
                                eventKey="1">
                            Sponsorship And Finance
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>
                            <button onClick={this.selectedProject1} className='project'>{this.state.project1}</button>
                            <button onClick={this.selectedProject2} className='project'>{this.state.project2}</button>
                            <button onClick={this.selectedProject3} className='project'>{this.state.project3}</button>
                            <button onClick={this.selectedProject4} className='project'>{this.state.project4}</button>
                            <button onClick={this.selectedProject5} className='project'>{this.state.project5}</button>
                            <button onClick={this.selectedProject6} className='project'>{this.state.project6}</button>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle 
                            as={Button} 
                            onClick={async ()=>{
                                this.setState({domain:"Outreach"})
                                await this.onProjectClick()}} 
                            variant="link" 
                            eventKey="2">
                            Outreach
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="2">
                    <Card.Body>
                        <button onClick={this.selectedProject1} className='project'>{this.state.project1}</button>
                        <button onClick={this.selectedProject2} className='project'>{this.state.project2}</button>
                        <button onClick={this.selectedProject3} className='project'>{this.state.project3}</button>
                        <button onClick={this.selectedProject4} className='project'>{this.state.project4}</button>
                        <button onClick={this.selectedProject5} className='project'>{this.state.project5}</button>
                        <button onClick={this.selectedProject6} className='project'>{this.state.project6}</button>
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle 
                            as={Button} 
                            onClick={async ()=>{
                                this.setState({domain:"Relations"})
                                await this.onProjectClick()}} 
                            variant="link" 
                            eventKey="3">
                            Relations
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="3">
                    <Card.Body>
                        <button onClick={this.selectedProject1} className='project'>{this.state.project1}</button>
                        <button onClick={this.selectedProject2} className='project'>{this.state.project2}</button>
                        <button onClick={this.selectedProject3} className='project'>{this.state.project3}</button>
                        <button onClick={this.selectedProject4} className='project'>{this.state.project4}</button>
                        <button onClick={this.selectedProject5} className='project'>{this.state.project5}</button>
                        <button onClick={this.selectedProject6} className='project'>{this.state.project6}</button>
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle 
                            as={Button} 
                            onClick={async ()=>{
                                this.setState({domain:"Documentation"})
                                await this.onProjectClick()}} 
                            variant="link" 
                            eventKey="5">
                            Documentation
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="5">
                    <Card.Body>
                        <button onClick={this.selectedProject1} className='project'>{this.state.project1}</button>
                        <button onClick={this.selectedProject2} className='project'>{this.state.project2}</button>
                        <button onClick={this.selectedProject3} className='project'>{this.state.project3}</button>
                        <button onClick={this.selectedProject4} className='project'>{this.state.project4}</button>
                        <button onClick={this.selectedProject5} className='project'>{this.state.project5}</button>
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle 
                            as={Button} 
                            onClick={async ()=>{
                                this.setState({domain:"SocialMediaAndMarketing"})
                                await this.onProjectClick()}} 
                            variant="link" 
                            eventKey="4">
                            Social Media and Marketing
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="4">
                    <Card.Body>
                        <button onClick={this.selectedProject1} className='project'>{this.state.project1}</button>
                        <button onClick={this.selectedProject2} className='project'>{this.state.project2}</button>
                        <button onClick={this.selectedProject3} className='project'>{this.state.project3}</button>
                        <button onClick={this.selectedProject4} className='project'>{this.state.project4}</button>
                        <button onClick={this.selectedProject5} className='project'>{this.state.project5}</button>
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
                </Accordion>
            </div>
        )
    }
}

export default Management;