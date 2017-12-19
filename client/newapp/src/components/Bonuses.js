import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;
const nearbyIcon = <IconLocationOn />;
const accountIcon = <FontIcon className="material-icons">account_balance</FontIcon>;

class Bonuses extends Component {

    render() {
        var data = this.props.data;
        var listBonuses = data.listBonuses;
        var arrAllBonuses = [];
        for( var key in listBonuses){
            arrAllBonuses.push(listBonuses[key])
        }
        var templateAllBonuses = arrAllBonuses.map(function(item, index) {
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
                        </CardText>
                        <CardActions>
                            <FlatButton label="Action1" />
                            <FlatButton label="Action2" />
                        </CardActions>
                    </Card>
                </div>
            )
        })

        return ( <div>
          <div>
             Данный о всех бонусах
              <div>{templateAllBonuses}</div>
              <div>

              </div>
           </div>
            </div>
        );
    }
}

export default Bonuses;
