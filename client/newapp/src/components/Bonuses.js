import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import superagent from 'superagent';

import RaisedButton from 'material-ui/RaisedButton';

const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;
const nearbyIcon = <IconLocationOn />;
const accountIcon = <FontIcon className="material-icons">account_balance</FontIcon>;


class Bonuses extends Component {

    constructor(){
        super();
        this.state = {

        }
    }
 render() {

        var data = this.props.data;
        var bonus = data.bonus
        var listBonuses = data.listBonuses;
        var arrAllBonuses = [];
        for( var key in listBonuses){
            arrAllBonuses.push(listBonuses[key]);
        }
        console.log(arrAllBonuses);

 var templateAllBonuses = arrAllBonuses.map(function(item, index, arr) {
            function addBonusToUser(e) {
                  e.preventDefault();
                  if(data.points >= item.priceBonus){
                      superagent
                          .post('http://localhost:8082/rest/v1/user/bonuses')
                          .set('Content-Type', 'application/json')
                          .set('Authorization', 'Bearer ' + localStorage.getItem('accesstoken'))
                          .send({"bonusId": item.bonusId})
                          .end((err, res) => {
                              if (err) {
                                  alert(res.body.message);
                              } else {
                                  alert('бонус добавлен');
                                  bonus.push(item);

                              }
                          });

                  }else { alert("недостаточно баллов")}
            }
            return (


                <div key={index}>
                    <Card
                        style={{

                        }}
                    >
                        <CardHeader

                            title={item.nameBonus}
                            subtitle="Subtitle"
                            avatar="https://lh3.googleusercontent.com/nYhPnY2I-e9rpqnid9u9aAODz4C04OycEGxqHG5vxFnA35OGmLMrrUmhM9eaHKJ7liB-=w170"
                        />
                        <CardText>
                            {item.descriptionBonus}
                            <div> Стоимость:  {item.priceBonus} </div>
                            <div> Магазин:  {item.store.storeName} </div>
                        </CardText>
                        <CardActions>
                            <RaisedButton key={index} onClick={addBonusToUser} label="добавить"/>
                        </CardActions>
                    </Card>
                </div>


            )
        })
            return (
          <div>
             Данный о всех бонусах
              <div>{templateAllBonuses }</div>
          </div>
        );
    }
}

export default Bonuses;
