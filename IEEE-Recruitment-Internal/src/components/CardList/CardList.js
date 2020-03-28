import React from 'react';
import CandidateCard from '../CandidateCard/CandidateCard';

import './CardList.css';

// const CardList = ({people,changeView}) => {
class CardList extends React.Component{
    // console.log(people);
    constructor(){
        super();
        this.state={
            clickedCandidateId: -1,
            view: "candidateDetails"
        };
    }
    changeClickedId=(a)=>{
        // console.log("Clicked Candidate ID: "+a);
        this.setState({
            clickedCandidateId: a
        });
    }
    render()
     {
         const {people, changeView}=this.props;
         console.log("Clicked Candidate ID Home: "+this.state.clickedCandidateId);
         if(this.state.clickedCandidateId===-1)
          {
            return(
                <div>
                {
                    people.map((user, i) => {
                        console.log(user);
                        // console.log(i);
                        // console.log(this.state.clickedCandidateId);
                        return (< CandidateCard
                                key={i}
                                reg_no={people[i].reg_no}
                                name={people[i].name}
                                domains={people[i].interests}
                                id={people[i].id}
                                changeView={changeView}
                                changeClickedId={this.changeClickedId}
                            />);
                      }
                    )}
            </div>
             );
          }
        else {
            return(
                <div>
                {
                    people.map((user, i) => {
                        console.log("User: "+JSON.stringify(user));
                        // console.log(i);
                        // console.log(this.state.clickedCandidateId);
                        if(people[i].id===this.state.clickedCandidateId)
                         {
                             return (< CandidateCard
                                key={i}
                                reg_no={people[i].reg_no}
                                name={people[i].name}
                                domains={people[i].interests}
                                id={people[i].id}
                                changeView={changeView}
                                changeClickedId={this.changeClickedId}
                            />);
                         }
                      }
                    )}
            </div>
             );
        }
     }
}

export default CardList;

/*                    else
                     {
                        return (< CandidateCard
                            key={i}
                            reg_no={people[i].reg_no}
                            name={people[i].name}
                            domains={people[i].interests}
                            id={people[i].id}
                            changeView={changeView}
                            changeClickedId={this.changeClickedId}
                        />);
                     }*/
//                this.state.clickedCandidateId===-1