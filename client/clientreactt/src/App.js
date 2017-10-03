import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import RaisedButton from 'material-ui/RaisedButton';

import { Link } from 'react-router-dom'


class App extends Component {
 
render() {
    return (
     
     <Link className='formcenter' to='/home'>Бонусная система</Link>
  
   
   );
  }
}

export default App;
