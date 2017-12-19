import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import FormLogin from './FormLogin';
class Login extends Component {
    
  
isAuthenticated(){
    const accesstoken = localStorage.getItem('accesstoken');
    return accesstoken && accesstoken.length>10;
}
handleSuccessfulLogin(){
    this.setState({});
}
render() {
       const isAlready = this.isAuthenticated();
        return (
            
        <div>
                    {isAlready ? <Redirect to= {{pathname : '/home'}} /> : (
                        < FormLogin onSuccessfulLogin={this.handleSuccessfulLogin.bind(this)} />
)} </div>
                    
 );
      }
    }

    export default Login;
      