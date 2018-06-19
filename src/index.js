import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import './initializeApp'; // this is going to run whatever is in initializeApp

import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
