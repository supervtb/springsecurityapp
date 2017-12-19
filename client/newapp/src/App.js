import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom'


class App extends Component {
 
render() {
    return ( <div>

     <Link className='formcenter' to='/home'>Бонусная система</Link>
     <div class = "formcenter" > Если у вас медленный интернет, то вы можете использовать html версию сайта:  </div>
     <a class = "formcenter" href="http://localhost:8082/chat"> HTML версия </a>
  
   </div>
   );
  }
}

export default App;
