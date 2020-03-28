import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import './App.css';
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login';
import Moderator from './pages/Moderator/Moderator';
import ChooseRole from './components/chooseRole/chooseRole.js';
import InterDomSelect from './pages/InterDomSelect/InterDomSelect';
import CandidateList from './pages/CandidateList/CandidateList.js';
import SecondInterview from './pages/SecondInterview/SecondInterview';
import Candidiate from './components/Candidate/Candidate';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Login} exact={true}/>
          <Route path="/signup" component={SignUp} exact={true}/>
          <Route path="/login" component={Login} exact={true}/>
          <Route path="/role" component={ChooseRole} exact={true}/>
          <Route path='/moderator' component={Moderator} exact={true} />
          {/* <Route path='/chooseRole' component={ChooseRole} exact={true} /> */}
          <Route path='/domain' component={InterDomSelect} exact={true} />
          <Route path='/candidateList' component={CandidateList} exact={true} />
          <Route path='/secondInterviewList' component={SecondInterview} exact={true} /> 
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
