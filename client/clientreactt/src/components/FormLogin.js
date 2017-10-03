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
    .end((err, res)=> {
        if(err) {this.setState({errorMessage:'Ошибка авторизации'}); return;}
    localStorage.setItem('accesstoken', res.body.access_token);
     this.props.onSuccessfulLogin();
  })
}
render() {
    if(this.state.errorMessage){
        alert(this.state.errorMessage);
        this.setState({errorMessage : undefined})
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
                    value = {this.state.password}
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
                    <TextField type="text" floatingLabelText = "e-mail" value= {this.state.password}
                    value = {this.state.password}
                    onChange={this.handlePasswordChanged.bind(this)}/>
                    </div>
                    
                    <div>
                    <TextField type="text" floatingLabelText = "Пароль" value= {this.state.password}
                    value = {this.state.password}
                    onChange={this.handlePasswordChanged.bind(this)}/>
                    </div>

                    <div>
                    <TextField type="text" floatingLabelText = "Фамилия" value= {this.state.password}
                    value = {this.state.password}
                    onChange={this.handlePasswordChanged.bind(this)}/>
                    </div>

                    <div>
                    <TextField type="text" floatingLabelText = "Имя" value= {this.state.password}
                    value = {this.state.password}
                    onChange={this.handlePasswordChanged.bind(this)}/>
                    </div>

                    <div>
                    <TextField type="text" floatingLabelText = "Отчество" value= {this.state.password}
                    value = {this.state.password}
                    onChange={this.handlePasswordChanged.bind(this)}/>
                    </div>

                    <div>
                    <TextField type="text" floatingLabelText = "Телефон" value= {this.state.password}
                    value = {this.state.password}
                    onChange={this.handlePasswordChanged.bind(this)}/>
                    </div>

                    <div>
                    <TextField type="text" floatingLabelText = "Номер карты" value= {this.state.password}
                    value = {this.state.password}
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
      