import React from 'react';
import MainPage from './MainPage/MainPage';
import QuestionPage from './components/Question/Question.js';
import ThankYouPage from './components/ThankYou/ThankYou.js';
import {ToastsContainer, ToastsStore} from 'react-toasts';

import './App.css';

var validator = require('validator'); //added validator

class App extends React.Component{
  constructor()
   {
     super();
     this.state={
       "page": "mainPage",
       "questions": ["What is your name?", "What is your contact number?", "What is your registration number?", "What is your email id?", "What is your hostel and hostel room number?", "What is the room number you are currently sitting in?"],
       "i": 0,
      //  "answers": ["Someone Shah", "9876543201", "65JDM6172", "someone@gmail.com", "N465", "2", ""],
      //  "answers": ["", "", "", "", "", ""],
       "answers": ["", "", "", "", "", "", "", "", ""],
       "showDomains": false,
       "domains": [],
       "token": "",
       "err": false,
       "errMsg": [],
       "success": false
     }
   }

   componentWillMount() {
    fetch(`${process.env.REACT_APP_API_URL}/questions`,{
      method:"get",
      headers: {
        "Content-Type":"application/json",
        "Accept-Encoding": "gzip, deflate",
      }
    })
      .then(Response => Response.json())
      .then((data) => {
        // console.log(data);
        // console.log(data.questions);
        data.questions.map((ques, i)=>{
          this.setState({
            questions: [...this.state.questions, ques[0].question]
          });
          return 0;
          // console.log(ques);
      });
      // this.setState({
      //   questions: [...this.state.questions, "Are you a boy?"]
      // });
    });
  }
  isFull=()=>{
    // console.log(this.state.i);
    // console.log(this.state.answers.length);
    if(this.state.i===5)
     {
      //  console.log("Full!");
       return true;
     }
     else
      {
        return false;
      }
  }
   updateToken=(a)=>{
     this.setState({
       token: a
     });
   }
  checkName=(a)=>{
    var b=a.split(" ");
    var flag=0;
    b.map((data)=>{
      // console.log(validator.isAlpha(data));
      if(!validator.isAlpha(data))
       {
         flag=1;
         return 1;
       }
      return 0;
    });
    // console.log(flag);
    if(flag===0)
     { return true;}
    else {
      return false;
    }
  }

  checkHostelRoom=(a, i)=>{
    var b=a.split(" ");
    var flag=0;
    b.map((data)=>{
      // console.log(validator.isAlpha(data));
      if(!validator.isAlphanumeric(data))
       {
         flag=1;
         return 1;
       }
      return 0;
    });
    // console.log(flag);
    // console.log(b.join(""));
    if(flag===0)
     { return true;}
    else {
      return false;
    }
  }

  changePage=(a, isVerified, token)=>{
    // console.log(this.state.token);
    // console.log(a);
    if(a!=="thankYouPage")
     {
      // console.log("Here!");
      this.setState({
        "page": a
      });
      return;
     }
    if(this.state.domains.length<4 && a==="thankYouPage")
     {
      if(this.state.domains.length<1)
      {
        if(window.outerWidth<=600)
          {
            alert("Please select atleast one field");
          }
        else
          {
            ToastsStore.error("Please select atleast one field", 6000);
          }
          return;
      }
      var i;
      for(i=0;i<4-this.state.domains.length;i++)
       {
        //  console.log(i);
         this.setState({
           "domains": [...this.state.domains, ""]
         });
       }
      //  ToastsStore.error("Please select four fields", 6000);
       //return;
     }
    if(validator.isEmail(this.state.answers[3]) && this.checkName(this.state.answers[0]) && validator.isAlphanumeric(this.state.answers[2]) && validator.isNumeric(this.state.answers[1])  && validator.isNumeric(this.state.answers[5]) && this.state.answers[1].length===10)//  && this.state.answers[1].length===10 && validator.isAlphanumeric(this.state.answers[4])
     {
     }
    else if(a==="thankYouPage")
     {
      // console.log("All fields are valid!");
      if(window.outerWidth<=600)
       {
         alert("Please recheck the details, ensure no special characters are used");
         if(!validator.isEmail(this.state.answers[3]))
          {
            alert("Please recheck your email");
          }
          if(!this.checkName(this.state.answers[0]))
          {
            alert("Please recheck your name");
          }
          if(!validator.isAlphanumeric(this.state.answers[2]))
          {
            alert("Please recheck your registration number");
          }
          if(!validator.isNumeric(this.state.answers[1]))
          {
            alert("Please recheck your contact number");
          }
          // if(!this.checkHostelRoom(this.state.answers[4]))
          // {
          //   alert("Please recheck your hostel room number");
          // }
          if(!validator.isNumeric(this.state.answers[5]))
          {
            alert("Please recheck your room number");
          }
          // console.log(this.state.answers[1].length);
          if(!this.state.answers[1].length===10)
          {
            // console.log("Here!");
            alert("Please ensure 10 letters for phone number");
          }
       }
      else
       {
         ToastsStore.error("Please recheck the details, ensure no special characters are used", 6000);
         if(!validator.isEmail(this.state.answers[3]))
          {
            ToastsStore.error("Please recheck your email", 6000);
          }
          if(!this.checkName(this.state.answers[0]))
          {
            ToastsStore.error("Please recheck your name", 6000);
          }
          if(!validator.isAlphanumeric(this.state.answers[2]))
          {
            ToastsStore.error("Please recheck your registration number", 6000);
          }
          if(!validator.isNumeric(this.state.answers[1]))
          {
            ToastsStore.error("Please recheck your contact number", 6000);
          }
          // if(!this.checkHostelRoom(this.state.answers[4]))
          // {
          //   ToastsStore.error("Please recheck your hostel room number", 6000);
          // }
          if(!validator.isNumeric(this.state.answers[5]))
          {
            ToastsStore.error("Please recheck your room number", 6000);
          }
          if(!this.state.answers[1].length===10)
          {
            // console.log("Here!");
            ToastsStore.error("Please ensure 10 letters for phone number", 6000);
          }
       }
     //  ToastsStore.error("Please recheck the details", 6000);
      return;
     }
    if(a==="thankYouPage")
     {
      //  console.log("Wait!");
       //console.log(isVerified);
       let formData = new FormData();
        // formData.append('answers', `${[{
        //     "answer": this.state.answers[6]
        //   },{
        //     "answer": this.state.answers[7]
        //   },{
        //     "answer": this.state.answers[8]
        //   }]}`);
        formData.append('recaptcha', `${token}`);
        formData.append('name', `${this.state.answers[0]}`);
        formData.append('contact', `${this.state.answers[1]}`);
        formData.append('reg_no', `${this.state.answers[2]}`);
        formData.append('email', `${this.state.answers[3]}`);
        formData.append('hostel', `${this.state.answers[4]}`);
        formData.append('interests', `${this.state.domains.join(', ')}`);
        formData.append('room_number', `${this.state.answers[5]}`);
        formData.append('answer1_text', `${this.state.answers[6]}`);
        formData.append('answer2_text', `${this.state.answers[7]}`);
        formData.append('answer3_text', `${this.state.answers[8]}`);
        formData.append('round_2_project_completion', `0`);
      //  console.log(this.state.answers);
      // console.log(this.state.token)
       if(isVerified)
       {
        fetch(`${process.env.REACT_APP_API_URL}/candidate`,{
          method: "post",
          // headers: {"Authorization": "Bearer "+cookie.load('enigma6').uid}
          headers: {
              'Content-Type': 'application/json',
              "Accept": "application/json",
              "Accept-Encoding": "gzip, deflate",
          },
          // mode: 'no-cors',
          body: JSON.stringify({
              recaptcha_field: this.state.token,
              // answers: [{
              //   answer: this.state.answers[6]
              // },{
              //   answer: this.state.answers[7]
              // },{
              //   answer: this.state.answers[8]
              // }],
              name: this.state.answers[0],
              contact: this.state.answers[1],
              reg_no: this.state.answers[2].toUpperCase(),
              email: this.state.answers[3],
              hostel: this.state.answers[4],
              interests: this.state.domains.join(', '),
              room_number: this.state.answers[5],
              question1_text: this.state.questions[6],
              question2_text: this.state.questions[7],
              question3_text: this.state.questions[8],
              answer1_text: this.state.answers[6],
              answer2_text: this.state.answers[7],
              answer3_text: this.state.answers[8]
              // round_2_project_completion: 0
          })
      }) 
      .then(response => {
        // console.log(response.status);
        if(response.status===400)
         {
          //  console.log("Error!");
           this.setState({
             "err": true
           });
          ToastsStore.error("Error!", 6000, "toastS");
         }
        else if(response.status===200)
         {
          //  console.log("Successfully Registered!");
           this.setState({
             "success": true
           });
          this.setState({
            "page": "thankYouPage"
          });
          // console.log("Here!");
          ToastsStore.success("Successfully Registered!", 6000);
          //  return response.json();
         }
        return response;
        //  console.log(response.body);
        //  return response.json();
      })
      .then((response)=>{
        if(response.status===201)
         {
          //  window.location.href="/thankYouPage";
          this.setState({
            "page": "thankYouPage"
          });
         }
         else {
           this.setState({
             err: true
           });
         }
        return response;
      })
      .then(response=>response.json())
      .then((response)=>{
          // console.log(response.json());
          // console.log(response.contact);
          // console.log(response.status);
          // console.log(response);
          if(this.state.err)
           {
             if(response.contact)
              {
                this.setState({
                  errMsg: [...this.state.errMsg, response.contact]
                });
                // console.log(response.contact[0][0].toUpperCase());
                // console.log(response.contact[0].substr(1));
                // console.log(response.contact[0]);
                ToastsStore.error(response.contact[0][0].toUpperCase()+response.contact[0].substr(1), 6000);
              }            
             if(response.email)
              {
                this.setState({
                  errMsg: [...this.state.errMsg, response.email]
                });
                ToastsStore.error(response.email[0][0].toUpperCase()+response.email[0].substr(1), 6000);
              }
             if(response.reg_no)
              {
                this.setState({
                  errMsg: [...this.state.errMsg, response.reg_no]
                });
                ToastsStore.error(response.reg_no[0][0].toUpperCase()+response.reg_no[0].substr(1), 6000);
              }
             if(response.recaptcha_field)
              {
                this.setState({
                  errMsg: [...this.state.errMsg, response.recaptcha_field]
                });
                ToastsStore.error(response.recaptcha_field[0][0].toUpperCase()+response.recaptcha_field[0].substr(1), 6000);
              }
              if(window.outerWidth<=600)
               {
                 alert(this.state.errMsg.join("\n"));
               }
           }
          //console.log("Redirecting!");
          // console.log(this.state.errMsg);
      })
      .catch(function(error) {
          // console.log(error);
        });
       }
      else
       {
        //  console.log("Please verify the recaptcha");
         if(window.outerWidth<=600)
          {
            alert("Please verify the recaptcha");
          }
         else
          {
            ToastsStore.error("Please verify the recaptcha", 6000);
          }
       }
       return;
     }
    // console.log(this.state.page);
  }
  incrementI=()=>{
    if(this.state.i<this.state.questions.length-1)
     {
       //console.log("Increment "+this.state.i);
       this.setState((oldValue)=>({
         "i": oldValue.i+1
       }));
       return "Ok";
      //  console.log(this.state.i);
     }
    else {
      // console.log("Overflow");
      this.setState({
        showDomains: true
      });
      // console.log(this.state.showDomains);
      // console.log("showDomains: "+this.state.showDomains+" i:"+this.state.i);
      if(this.state.showDomains===false && this.state.i===this.state.questions.length-1)
      {
        // console.log("Ab Dekh!");
        this.setState((oldValue)=>({
          "i": oldValue.i+1
         }));
      }
      return "Overflow";
    }
  }
  decrementI=()=>{
    if(this.state.i>0)
     {
       if(this.state.showDomains)
        {
          this.setState({
            "showDomains": !this.state.showDomains
          });
        }
      //  console.log("Decrement "+this.state.i);
       this.setState((oldValue)=>({
         "i": oldValue.i-1
        }));
       return "Ok";
      //  console.log(this.state.i);
     }
    else {
      // console.log("Underflow");
      // console.log(this.state.answers);
      return "Underflow";
    }
  }
  changeAnswer=(event)=>{
    var a=this.state.answers;
    a[this.state.i]=event.target.value;
    a.push(event.target.value);
    // console.log(a);
    this.setState({
      "answers": a
    });
    // console.log(event.target.value);
  }
  currentAnswer=(a)=>{
    if(a==="decrement")
     {
      return this.state.answers[this.state.i-1];
     }
    else
     {
      return this.state.answers[this.state.i+1];
     }
  }
  // componentDidMount()
  //  {
  //   this.incrementI();
  //  } 
  addDomains=(a)=>{
    // console.log("Entered!");
    if(this.state.domains.length<4)
     {
      // console.log("Entered if");
      if(this.state.domains.includes(a))
       {
        //  console.log("Duplicate!");
         return;
       }
      this.setState({
        "domains": [...this.state.domains, a]
      });
     }
    else {
      // console.log("Not more than 4!");
      // console.log(this.state.domains);
    }
  }
  resetDomains=()=>{
    // console.log("Reset!");
    this.setState({
      "domains": []
    });
  }
  textAreaHide=()=>{
    //console.log(this.state.i);
    if(this.state.i===this.state.answers.length-1)
     {
       return true;
     }
    else {
      return false;
    }
  }
 textAreaUnhide=()=>{
   if(this.state.i===this.state.answers.length && this.state.showDomains)
    {
      return true;
    }
   else {
     return false;
   }
 }
  render()
   {
    //  var a=false;
    //  console.log(this.state);
    //  if(this.state.showDomains===true)
    //   {
    //     a=true;
    //   }
    return (
      <div className="App">
        {
          this.state.page==="mainPage"
          ?
          <MainPage changePage={this.changePage}/>
          :
          this.state.page==="questionPage"
          ?
          <QuestionPage i={this.state.i} incrementI={this.incrementI} decrementI={this.decrementI} question={this.state.questions[this.state.i]} changeAnswer={this.changeAnswer} currentAnswer={this.currentAnswer} showDomains={this.state.showDomains} changePage={this.changePage} addDomains={this.addDomains} resetDomains={this.resetDomains} textAreaHide={this.textAreaHide} textAreaUnhide={this.textAreaUnhide} updateToken={this.updateToken} domains={this.state.domains} isFull={this.isFull}/>
          :
          this.state.page==="thankYouPage"
          ?
          <ThankYouPage />
          :
          <div></div>
        }
      {/* ToastsStore.success("Hey, you just clicked!") */}
      {
        window.outerWidth<=600?
        // <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_LEFT}/>
        <div></div>
        :<ToastsContainer store={ToastsStore}/>
      }
      </div>
    );
   }
}

export default App;