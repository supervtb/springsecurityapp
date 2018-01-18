import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import superagent from 'superagent';
import {Redirect} from 'react-router-dom';




class Login extends Component {
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
                this.setState({});
            }
            else {
                alert("Сервер недоступен");
                return;
            }
            })
    }


    isAuthenticated(){
        const accesstoken = localStorage.getItem('accesstoken');
        return accesstoken && accesstoken.length>10;
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

        const isAlready = this.isAuthenticated();
        return (
        <div>
            {isAlready ? <Redirect to= {{pathname : '/admin'}} /> : (

                <div>
                    <Grid>
                        <Grid item xs>
                            <Paper style={{textAlign: 'center'}} >
                                <form onSubmit={this.submitForm.bind(this)}>
                                    <div>
                                        <TextField style={{
                                            width: 200,
                                        }}
                                                   id="name"
                                                   label="Логин"
                                                   margin="normal"
                                                   value = {this.state.username}
                                                   onChange={this.handleUsernameChanged.bind(this)}
                                        />
                                    </div>
                                    <div>
                                        <TextField style={{
                                            width: 200,
                                        }} type="password"
                                                   id="password"
                                                   label="Пароль"
                                                   margin="normal"
                                                   value= {this.state.password}
                                                   onChange={this.handlePasswordChanged.bind(this)}

                                        />
                                    </div>
                                    <div>
                                        <Button   raised color="primary" type="submit" >
                                            Войти
                                        </Button>
                                    </div>
                                </form>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            )} </div>


        );
    }
}

export default Login;
