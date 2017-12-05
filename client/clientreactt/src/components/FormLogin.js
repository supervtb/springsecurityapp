import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import superagent from 'superagent';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';




class FromLogin extends Component {
    constructor(){
        super();
        this.state = {
            username : "",
            password : "",
            email : "",
            secondname : "",
            firstname : "",
            middlename : "",
            phone : "",
            bonuscardnumber : ""
        }

    }
handleUsernameChanged(event){
    this.setState({username: event.target.value})

}
handlePasswordChanged(event){
    this.setState({password: event.target.value})

}

handleEmailChanged(event){
    this.setState({email: event.target.value});
}
handleSecondnameChanged (event){
    this.setState({secondname: event.target.value})
}
handleFirstnameChanged(event){
    this.setState({firstname: event.target.value})
}
handleMiddlenameChanged(event){
    this.setState({middlename : event.target.value})
}

handlePhoneChanged(event){
    this.setState({phone: event.target.value})
}

handleBonuscardnumberChanged(event){
    this.setState({bonuscardnumber : event.target.value})
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

registration(event){
    event.preventDefault();
   superagent
   .post('http://localhost:8082/rest/v1/user')
   .set('Content-Type','application/json')
   .send({
    "name":this.state.username,
	"password":this.state.password,
	"email":this.state.email,
	"firstname":this.state.firstname,
	"secondname": this.state.secondname,
	"middlename":this.state.middlename,
	"phone":this.state.phone,
	"bonuscardnumber":this.state.bonuscardnumber
   })
  .end((err, res)=> { if (res) {
    if (err) {
        this.setState({errorMessage: res.statusCode});
        return;
    } alert("Вы зарегистрированы");
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
        if (this.state.errorMessage == '500') {
            alert("Такой пользователь уже существует");
            this.setState({errorMessage: undefined})
        }
    }

       return (

            <Tabs>
    <Tab icon={<FontIcon className="material-icons" >apps</FontIcon>} label="Вход" >
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
    <Tab  icon={<FontIcon className="material-icons" >check</FontIcon>}  label="Регистрация" >
      <div className='formcenter'>
      <form onSubmit={this.registration.bind(this)}>
                  <div>
                    <TextField  className='registration' floatingLabelText = "Логин"
                    value = {this.state.username}
                    onChange={this.handleUsernameChanged.bind(this)}/>



                    <TextField className='registration'  type="text" floatingLabelText = "e-mail"
                    value = {this.state.email}
                    onChange={this.handleEmailChanged.bind(this)}/>



                    <TextField className='registration' type="text" floatingLabelText = "Пароль"
                    value = {this.state.password}
                    onChange={this.handlePasswordChanged.bind(this)}/>

                        </div>
                    <div>
                    <TextField className='registration' type="text" floatingLabelText = "Фамилия"
                    value = {this.state.secondname}
                    onChange={this.handleSecondnameChanged.bind(this)}/>



                    <TextField className='registration' type="text" floatingLabelText = "Имя"
                        value = {this.state.firstname}
                    onChange={this.handleFirstnameChanged.bind(this)}/>



                    <TextField className='registration' type="text" floatingLabelText = "Отчество"
                    value = {this.state.middlename}
                    onChange={this.handleMiddlenameChanged.bind(this)}/>
                    </div>


                    <TextField className='registration' type="text" floatingLabelText = "Телефон"
                    value = {this.state.phone}
                    onChange={this.handlePhoneChanged.bind(this)}/>



                    <TextField className='registration' type="text" floatingLabelText = "Номер карты"
                    value = {this.state.bonuscardnumber}
                    onChange={this.handleBonuscardnumberChanged.bind(this)}/>
                   <div>
                    <RaisedButton type='submit' label = "Зарегистрироваться"  />
                    </div>
                     </form>
      </div>
    </Tab>
    </Tabs>



        );
      }
    }

    export default FromLogin;
