import React, { Component } from 'react';

import {Redirect} from 'react-router-dom';

import RaisedButton from 'material-ui/RaisedButton';


class Home extends Component {
    

isAuthenticated(){
    const accesstoken = localStorage.getItem('accesstoken');
    return accesstoken && accesstoken.length>10;
}
onClick () {
    localStorage.removeItem('accesstoken');
    this.setState({});
}


render() {
    
    const isAlready = this.isAuthenticated();
    return (
     
     
        <div>
        {!isAlready ? <Redirect to= {{pathname : '/login'}} /> : (

           
                <div> 
                    Вы авторизованы
                    <div><RaisedButton onClick={this.onClick.bind(this)}   label = "Выйти" /></div>

                </div>
                

        )}
         </div>

    );
  }
}

export default Home;
