import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Login from './components/Login';
import Home from './components/Home';
import {Row, Col} from 'react-flexbox-grid';
ReactDOM.render(
  <MuiThemeProvider>
  
  
  <Router>

    
    <Row around='xs'>
      <Col xs={12} md={11}>
       <Route exact  path="/" component={App} />
       <Route exact path="/login" component={Login}  />
       <Route exact path="/home" component={Home}  />
       </Col>
    </Row>

  </Router>
  </MuiThemeProvider> , document.getElementById('root'));
registerServiceWorker();
