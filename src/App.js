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
//
// import bittrex from 'node.bittrex.api'
//
//
// window.bittrex = bittrex;
// console.log
//
// const About = () => (
//     <div>
//       <h2>About</h2>
//     </div>
// )
//
// const Topic = ({ match }) => (
//     <div>
//       <h3>{match.params.topicId}</h3>
//     </div>
// )
//
// const Topics = ({ match }) => (
//     <div>
//       <h2>Topics</h2>
//       <ul>
//         <li>
//           <Link to={`${match.url}/rendering`}>
//             Rendering with React
//           </Link>
//         </li>
//         <li>
//           <Link to={`${match.url}/components`}>
//             Components
//           </Link>
//         </li>
//         <li>
//           <Link to={`${match.url}/props-v-state`}>
//             Props v. State
//           </Link>
//         </li>
//       </ul>
//
//       <Route path={`${match.url}/:topicId`} component={Topic}/>
//       <Route exact path={match.url} render={() => (
//           <h3>Please select a topic.</h3>
//       )}/>
//     </div>
// )


class App extends Component {
  render() {
    return (
    <Provider store={store}>
      <Router>
      <div className="App">
        <ul>
          <li><Link to="/">Home</Link></li>
          {/*<li><Link to="/about">About</Link></li>*/}
          {/*<li><Link to="/topics">Topics</Link></li>*/}
        </ul>

        <Route exact path="/" component={ExchangeHome}/>
      </div>
      </Router>
    </Provider>
    );
  }
}

export default App;
