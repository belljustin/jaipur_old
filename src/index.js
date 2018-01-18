import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

let path = window.location.pathname.split("/");
let playerID = path[path.length - 1];
ReactDOM.render(<App gameID="foo" playerID={playerID}/>, document.getElementById('root'));
