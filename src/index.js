import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

let params = (new URL(document.location)).searchParams;
let playerID = params.get("player");
ReactDOM.render(<App gameID="foo" playerID={playerID}/>, document.getElementById('root'));

