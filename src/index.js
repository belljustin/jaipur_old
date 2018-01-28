import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

let params = (new URL(document.location)).searchParams;
let playerID = params.get("player");
let gameID = params.get("id") || 0;
console.log(gameID);
ReactDOM.render(<App gameID={gameID} playerID={playerID}/>, document.getElementById('root'));

