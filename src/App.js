import React, { Component } from 'react';
import logo from './logo.svg';
import { Provider } from 'react-redux'
import './App.css';
import store, {history} from './store/configStore'
import { render } from 'react-dom'
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import 'antd/dist/antd.css';
import { Card } from 'antd';
import ExchangeHome from './container/ExchangeHome'

class App extends Component {
  render() {
    return (
    <Provider store={store}>
      <Router>
      <div className="App">
        <ul>
          <li><Link to="/">Home</Link></li>
        </ul>
        <Route exact path="/" component={ExchangeHome}/>
      </div>
      </Router>
    </Provider>
    );
  }
}

export default App;
