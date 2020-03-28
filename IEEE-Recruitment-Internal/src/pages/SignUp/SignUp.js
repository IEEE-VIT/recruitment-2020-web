import React from 'react';

import './SignUp1.css';

import ieeeLogo from '../../assets/logoplus.png';
class SignUp extends React.Component {
    constructor() {
        super();
        this.state={
            username:"",
            email:"",
            password:"",
            conpassword:"",
            firstName:"",
            lastName:"",
            status:"",
            loading: false
        }
    }

    onButtonClick = () => {
        // window.location.href="/chooseRole";
        console.log('start')
        let formData = new FormData();
        formData.append('username', `${this.state.username}`);
        formData.append('first_name', `${this.state.firstName}`);
        formData.append('last_name', `${this.state.lastName}`);
        formData.append('email', `${this.state.email}`);
        formData.append('password', `${this.state.password}`);
        this.setState({
            "loading": true
        });
            fetch("https://recruitment-backend-19.herokuapp.com/recruiter/auth/register",{
                method: "post",
                headers: {
                    // "Content-Type": "multipart/form-data",
                    "Accept-Encoding": "gzip, deflate",
                    
                },
                body: formData
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
            .then(response => {
                console.log(response);
                if(response.status !== 400) {
                    this.setState({status:"Account succesfully created."});
                    alert("Account successfully created. Please contact the admin to ask to give you permissions.");
                    window.location.href="/login";
                }
                else {
                    this.setState({status:"Error occured. Please try again."});
                    alert("Error occured. Please try again.");
                }
            }).catch((err)=>{
                alert(err);
                console.log(err);
            });
            // console.log('works');
        }

    render() {
        if(this.state.loading)
         {
             return(<h1>Loading...</h1>);
         }
        return(
            <div className='signup'>
                <br />
                {/* <h1> Sign Up </h1> */}
                <div className="card-container-signup">
                <div className="logo-card-container-signup">
                    <img src={ieeeLogo} alt="" />
                    <br />
                    Welcome to the IEEE Recruitment Panel
                </div>
                <div className="form-container-signup">
                    <div className="form-row-signup">
                        <label className="form-row-element-signup">
                            <span>Username</span>
                            <input 
                                type="text" 
                                className="input-element"
                                placeholder=''
                                onChange={event => this.setState({username: event.target.value})}
                            />
                        </label>
                    </div>
                    <div className="form-row">
                        <label className="form-row-element">
                            <span>First Name</span>
                            <input 
                                type="text" 
                                className="input-element"
                                placeholder=''
                                onChange={event => this.setState({firstName: event.target.value})}
                            />
                        </label>
                    </div>
                    <div className="form-row">
                        <label className="form-row-element">
                            <span>Last Name</span>
                            <input 
                                type="text" 
                                className="input-element"
                                placeholder=''
                                onChange={event => this.setState({lastName: event.target.value})}
                            />
                        </label>
                    </div>
                    <div className="form-row">
                        <label className="form-row-element">
                            <span>Email</span>
                            <input 
                                type="email" 
                                className="input-element"
                                placeholder=''
                                onChange={event => this.setState({email: event.target.value})}
                            />
                        </label>
                    </div>
                    <div className="form-row">
                        <label className="form-row-element">
                            <span>Password</span>
                            <input 
                                type="password" 
                                className="input-element"
                                placeholder='' 
                                onChange={event => this.setState({password: event.target.value})}
                            />
                        </label>
                    </div>
                    <div className="form-row">
                        <label className="form-row-element">
                            <span>Confirm Password</span>
                            <input 
                                type="password" 
                                className="input-element"
                                placeholder='' 
                                onChange={event => this.setState({conpassword: event.target.value})}
                            />
                        </label>
                    </div>
                    <div className="btn-submit-container">
                        <button className="btn-login" onClick={()=>{this.onButtonClick()}}>SignUp</button>
                </div>
                <br />
                <div className="btn-login-container">
                    <button className="btn-submit" onClick={()=>{ window.location.href="/login"}}>Login</button>
                </div>
                </div>
                </div>
            </div>
        )
    }
}

export default SignUp;