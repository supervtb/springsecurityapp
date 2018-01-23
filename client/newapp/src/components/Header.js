import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';


import Account from './Account';
import Bonuses from './Bonuses';
import Map from './Map'


const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;
const nearbyIcon = <IconLocationOn />;
const accountIcon = <FontIcon className="material-icons">accessibility</FontIcon>;

class Header extends Component {
  state = {
    selectedIndex: 0,
  };

  select = (index) => this.setState({selectedIndex: index});

 

   render() {
       var selectedIndex = this.state.selectedIndex;
       if (selectedIndex==0) {
        var otrisovat = <Account data={this.props.data} />
    }
       if (selectedIndex==1) {
           var otrisovat = <Bonuses data={this.props.data} />
       }
       if (selectedIndex==2) {
        var otrisovat = <Map />
    }

       return ( <div>
          <Paper zDepth={1}>
        <BottomNavigation selectedIndex={this.state.selectedIndex}   >
          <BottomNavigationItem
            label="Аккаунт"
            icon={accountIcon}
            onClick={() => this.select(0)}
            />
          <BottomNavigationItem
            label="Бонусы"
            icon={favoritesIcon}
            onClick={() => this.select(1)}
          />
          <BottomNavigationItem
            label="Карта"
            icon={nearbyIcon}
            onClick={() => this.select(2)}
          />
            {BottomNavigationItemAdmin}
        </BottomNavigation>
      </Paper>

               {otrisovat}

               

 </div>
      );
     }
   }

   export default Header;
