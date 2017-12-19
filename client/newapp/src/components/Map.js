import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';

const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;
const nearbyIcon = <IconLocationOn />;
const accountIcon = <FontIcon className="material-icons">account_balance</FontIcon>;

class Map extends Component {




    render() {

        return ( <div>
          <div>
             Просто отобразить карту
           </div>
            </div>
        );
    }
}

export default Map;
