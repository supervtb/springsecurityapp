import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import RaisedButton from 'material-ui/RaisedButton';
import superagent from 'superagent';

const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;
const nearbyIcon = <IconLocationOn />;
const accountIcon = <FontIcon className="material-icons">account_balance</FontIcon>;


class Account extends Component {
    constructor(){
        super();
        this.state = {
        }
    }

    onChange(e) {
        this.props.onSpeedChange(e.target.value);
    }


render() {
        var data = this.props.data
        var bonus = data.bonus
        var arr = []
        for( var key in bonus){
        arr.push(bonus[key])
      }
    var newsTemplate = arr.map(function(item, index) {
            function removeBonusToUser(e) {
                e.preventDefault();
                superagent
                        .delete('http://localhost:8082/rest/v1/user/bonuses')
                        .set('Content-Type', 'application/json')
                        .set('Authorization', 'Bearer ' + localStorage.getItem('accesstoken'))
                        .send([{"bonusId": item.bonusId}])
                        .end((err, res) => {
                            if (err) {
                                alert(res.body.message);
                            } else {
                                alert('бонус удален');
                                bonus.shift(item);
                            }
                        });



            }

            return (
              <div key={index}>
                <p className="arr__bonusId">{item.nameBonus}</p>
                  <RaisedButton key={index} onClick={removeBonusToUser.bind(this) } label="Удалить бонус"/>
              </div>
            )
          })
 return ( <div>
           <div> Добрый день {data.name} {data.secondname} </div>
           <div> Ваш номер карты:  {data.bonuscardnumber} </div>
           <div> Количество баллов:  {data.points} </div>
           <div> Подключенные баллы: {newsTemplate} </div>
            </div>
        );
    }
}

export default Account;
