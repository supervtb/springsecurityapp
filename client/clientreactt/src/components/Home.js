import React, { Component } from 'react';

import {Redirect} from 'react-router-dom';

import RaisedButton from 'material-ui/RaisedButton';
import Header from './Header';
import superagent from 'superagent';


class Home extends Component {

    constructor(){
        super();
        this.state = {
            firstname : "",
           }
        
    }
    componentDidMount(){
        superagent.get('http://localhost:8082/rest/v1/getuser')
        .set('Content-Type','application/x-www-form-urlencoded')
        .set('Authorization','Bearer '+localStorage.getItem('accesstoken'))
        .end((err,res) =>{ if (res){
            this.setState({
                firstname:res.body.firstname,
                secondname:res.body.secondname,
                bonuscardnumber: res.body.bonuscardnumber
                })
        }
        else {
            localStorage.removeItem('accesstoken');
            this.setState({});
            
        }}
        )}
    

isAuthenticated(){
  
    const accesstoken = localStorage.getItem('accesstoken');
    return accesstoken && accesstoken.length>10;
}
onClick () {
    localStorage.removeItem('accesstoken');
    this.setState({});
}

deleteaccount(){
    superagent
        .delete('http://localhost:8082/rest/v1/deleteaccount')
        .set('Content-Type','application/x-www-form-urlencoded')
        .set('Authorization','Bearer '+localStorage.getItem('accesstoken'))
        .end((err,res) =>{
        if (err) {
            alert('произошла ошибка')
        }
        localStorage.removeItem('accesstoken');
        this.setState({});
        alert('Аккаунт удален');
        } );
}



render() {

    var name = this.state.firstname;
    var secondname = this.state.secondname;
    var bonuscardnumber = this.state.bonuscardnumber;
    
    const isAlready = this.isAuthenticated();
    return (
      <div>
        {!isAlready ? <Redirect to= {{pathname : '/login'}} /> : (
                  <div> 
                    <div>
                        <Header />
                   </div>
                   <div>
                       Добрый день {name} {secondname}
                    </div>
                    <div>
                    Ваш номер карты: {bonuscardnumber}
                    </div>
                      <div><RaisedButton onClick={this.deleteaccount.bind(this)}   label = "Удалить аккаунт" /></div>
                    <div><RaisedButton onClick={this.onClick.bind(this)}   label = "Выйти" /></div>

                </div>
                

        )}
         </div>

    );
  }
}

export default Home;
