import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import superagent from 'superagent';
import {Tabs, Tab} from 'material-ui/Tabs';
class FromLogin extends Component {
    constructor(){
        super();
        this.state = {
            username : "",
            password : "",
        }
        
    }
handleUsernameChanged(event){
    this.setState({username: event.target.value})
    
}
handlePasswordChanged(event){
    this.setState({password: event.target.value})
    
}



submitForm(event){
    event.preventDefault();
    superagent
    .post('http://localhost:8082/oauth/token?username='+this.state.username+'&password='+this.state.password)
    .set('Content-Type','application/x-www-form-urlencoded')
   .set('Authorization','Basic Y2xpZW50aWQ6c2VjcmV0')
  .send({"username" : "clientid" , "password ": "secret", "grant_type" : "password"})
    .end((err, res)=> { if (res) {
        if (err) {
            this.setState({errorMessage: res.statusCode});
            return;
        }
        localStorage.setItem('accesstoken', res.body.access_token);
        this.props.onSuccessfulLogin();
    }
     else {
        alert("Сервер недоступен");
        return;
    }
    })
}

render() {
    if(this.state.errorMessage){
        if (this.state.errorMessage == '400') {
            alert("Неправильный логин или пароль");
            this.setState({errorMessage: undefined})
        }
    }
    
       return (
        
            <Tabs>
    <Tab label="Вход" >
      <div className='formcenter'> 
      <form onSubmit={this.submitForm.bind(this)}>
                    <div> 
                    <TextField  floatingLabelText = "Логин" 
                    value = {this.state.username}
                    onChange={this.handleUsernameChanged.bind(this)}/>
                    </div>
                    <div>
                    <TextField type="password" floatingLabelText = "Пароль" value= {this.state.password}
                    onChange={this.handlePasswordChanged.bind(this)}/>
                    </div>
                    <div>
                    <RaisedButton  type="submit" label = "Войти" />
                     </div>
                     </form>
                 
      </div>
    </Tab>
    <Tab label="Регистрация" >
      <div className='formcenter'>
      <form onSubmit={this.submitForm.bind(this)}>
                    <div> 
                    <TextField  floatingLabelText = "Логин" 
                    value = {this.state.username}
                    onChange={this.handleUsernameChanged.bind(this)}/>
                    </div>

                    <div>
                    <TextField type="text" floatingLabelText = "e-mail"

                    onChange={this.handlePasswordChanged.bind(this)}/>
                    </div>
                    
                    <div>
                    <TextField type="text" floatingLabelText = "Пароль"

                    onChange={this.handlePasswordChanged.bind(this)}/>
                    </div>

                    <div>
                    <TextField type="text" floatingLabelText = "Фамилия"

                    onChange={this.handlePasswordChanged.bind(this)}/>
                    </div>

                    <div>
                    <TextField type="text" floatingLabelText = "Имя"

                    onChange={this.handlePasswordChanged.bind(this)}/>
                    </div>

                    <div>
                    <TextField type="text" floatingLabelText = "Отчество"

                    onChange={this.handlePasswordChanged.bind(this)}/>
                    </div>

                    <div>
                    <TextField type="text" floatingLabelText = "Телефон"

                    onChange={this.handlePasswordChanged.bind(this)}/>
                    </div>

                    <div>
                    <TextField type="text" floatingLabelText = "Номер карты"

                    onChange={this.handlePasswordChanged.bind(this)}/>
                    </div>
                    <div>
                    <RaisedButton  type="submit" label = "Войти" />
                     </div>
                     </form>
      </div>
    </Tab>
    </Tabs>
               



           
           
        );
      }
    }

    export default FromLogin;
      