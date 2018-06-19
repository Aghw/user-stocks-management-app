import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import HomePage from './HomePage';
import StockPage from './StocksPage';
import NavigationBar from './NavigationBar';
import './StyleSheet/Stocks.css';

import {
  BrowserRouter as Router, Route
} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React Stock Management App</h1>
        </header>

        <div className='stock-manager-body'>
          <Router>
            <div>
              <NavigationBar />
              <Route exact path="/" component={HomePage} />
              <Route exact path="/stocks" component={StockPage} />
            </div>
          </Router>

            <footer>
              <p>Page layout design and react components code by asmerom.</p>
              <p>Copyright &#169; 2018, All rights reserved.</p>
            </footer>
        </div>
      </div>
    );
  }
}

export default App;
