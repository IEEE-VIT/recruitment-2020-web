import React from 'react';
import cookie from 'react-cookies';

import './Login1.css';

import ieeeLogo from '../../assets/logoplus.png';

class Login extends React.Component {
    constructor() {
        super();
        this.state={
            username:"",
            password:"",
            loading: false
        }
    }

    //prevent urls to be undefined
    
    onButtonClick = () => {
        console.log('start')
        let formData = new FormData();
        formData.append('username', `${this.state.username}`);
        formData.append('password', `${this.state.password}`);
        // console.log(`${process.env.REACT_APP_API_URL}/recruiter/auth/login`);
        this.setState({
            "loading": true
        });
            fetch(`${process.env.REACT_APP_API_URL}/recruiter/auth/login`,{
                method: "post",
                headers: {
                    // "Content-Type": "multipart/form-data",
                    "Accept-Encoding": "gzip, deflate",
                },
                // mode: 'no-cors',
                body: formData
            })
            .then(data => {
                // console.log(data);
                // console.log(data.status);
                if(data.status===200)
                 {
                    this.setState({status:"Login successful"});
                 }
                else
                 {
                    this.setState({status:"Error occured. Please try again."});
                    alert("Innvalid login credentials.")
                 }
                 this.setState({
                    "loading": false
                });
                return data;
            })
            .then(Response => Response.json())
            .then((Response)=>{
                console.log(this.state.status);
                if(this.state.status==="Login successful")
                 {

                     const expires = new Date();
                     expires.setDate(Date.now() + 1000 * 60 * 60 * 1);
                     // that.setState({loading: false})
                     cookie.save('token', JSON.stringify({token: Response.token}),{
                         expires
                     });
                    //  alert("Login successful");
                     window.location.href="/role";
                 }
                else {
                    alert("Error occured. Please try again.");
                }
            });
            // console.log('works');
            this.setState({status:"Succesful"});
    }

    render() {
        if(this.state.loading)
         {
             return(<h1>Loading...</h1>);
         }
        return(
            // <div className='login'>
            //     <br />
            //     <h1> Login </h1>
            //     <div className='form-basic'>
            //         <div className="form-row">
            //                 <label>
            //                     <span>Email</span>
            //                     <input 
            //                         type="text" 
            //                         className="name"
            //                         placeholder=''
            //                         onChange={event => this.setState({username: event.target.value})}
            //                     />
            //                 </label>
            //             </div>
                        
            //             <div className="form-row">
            //                 <label>
            //                     <span>Password</span>
            //                     <input 
            //                         type="password" 
            //                         className="name"
            //                         placeholder='' 
            //                         onChange={event => this.setState({password: event.target.value})}
            //                     />
            //                 </label>
            //             </div>
            //     </div>
            //     <div className="form-row1">
            //         <button className="submit"onClick={()=>{this.onButtonClick()}}>Login</button>
            //     </div>
            //     <div className="form-row1">
            //         <button className="submit" onClick={()=>{ window.location.href="/signup"}}>Sign Up</button>
            //     </div>
            // </div>


            <div className='login'>
                <br />
                {/* <h1 className="login-heading"> Login </h1> */}
                <div className="card-container">
                <div className="logo-card-container">
                    <img src={ieeeLogo} alt="" />
                    <br />
                    Welcome to the IEEE Recruitment Panel
                </div>
                <div className='form-container'>
                    {/* Login into Admin Panel */}
                    <div className="form-row">
                            <label className="form-row-element">
                                <span>Email</span>
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
                                <span>Password</span>
                                <input 
                                    type="password" 
                                    className="input-element"
                                    placeholder='' 
                                    onChange={event => this.setState({password: event.target.value})}
                                />
                            </label>
                        </div>
                        <div className="btn-login-container">
                            <button className="btn-login"onClick={()=>{this.onButtonClick()}}>Login</button>
                        </div>
                        <div className="btn-submit-container">
                            <button className="btn-submit" onClick={()=>{ window.location.href="/signup"}}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;