import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';

const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;
const nearbyIcon = <IconLocationOn />;
const accountIcon = <FontIcon className="material-icons">account_balance</FontIcon>;

class Account extends Component {
render() {
        var data = this.props.data
        var bonus = data.bonus
        var arr = []
        for( var key in bonus){
        arr.push(bonus[key])
      }
        
        var newsTemplate = arr.map(function(item, index) {
            return (
              <div key={index}>
                <p className="arr__bonusId">{item.nameBonus}</p>
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
