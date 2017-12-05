import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Login from './components/Login';
import Home from './components/Home';


ReactDOM.render(
  <MuiThemeProvider>
    
  
  <Router>

    <div>
    
       <Route exact  path="/" component={App} />
       <Route exact path="/login" component={Login}  />
       <Route exact path="/home" component={Home}  />
       </div>

  </Router>
  </MuiThemeProvider> , document.getElementById('root'));
registerServiceWorker();
