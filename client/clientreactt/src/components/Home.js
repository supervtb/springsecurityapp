import React, { Component } from 'react';

import {Redirect} from 'react-router-dom';

import RaisedButton from 'material-ui/RaisedButton';
import Header from './Header';
import superagent from 'superagent';
import Favorite from "./Favorite";


class Home extends Component {
  constructor(){
        super();
        this.state = {
            firstname : "",
           }
}




    componentDidMount(){
        superagent.get('http://localhost:8082/rest/v1/user')
        .set('Content-Type','application/x-www-form-urlencoded')
        .set('Authorization','Bearer '+localStorage.getItem('accesstoken'))
        .end((err,res) =>{ if (res){
            this.setState({
                firstname:res.body.firstname,
                secondname:res.body.secondname,
                bonuscardnumber: res.body.bonuscardnumber,
                points: res.body.points,
                bonuses : res.body.bonus
                })
        }
        else {
            localStorage.removeItem('accesstoken');
            this.setState({});

        }}
        )

    }


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
        .delete('http://localhost:8082/rest/v1/user')
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
  var test = this.state.selectedIndex;
  if (test==1) {
      var otrisovat = <Favorite />
  }



  var  bonus = this.state.bonuses ;
  var arr = []
  for( var key in bonus){
  arr.push(bonus[key])
  console.log(bonus[key].bonusId);
}
var newsTemplate = arr.map(function(item, index) {
      return (
        <div key={index}>
          <p className="arr__bonusId">{item.nameBonus}</p>
        </div>
      )
    })

    var name = this.state.firstname;
    var secondname = this.state.secondname;
    var bonuscardnumber = this.state.bonuscardnumber;
    var points = this.state.points;



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
                      <div>
                          Количество баллов: {points}
                      </div>
                      <div>
                          Подключенные бонусы: {newsTemplate}
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
