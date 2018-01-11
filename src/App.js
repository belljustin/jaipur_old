import React, { Component } from 'react';
import { Client } from 'boardgame.io/client';
import { Game } from 'boardgame.io/core';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

const deckComposition = [8, 6, 6, 6, 8, 8, 10];
function buildDeck(composition) {
  let deck = [];
  for (type = 0; type < composition.length; type++) {
    let c = new Card(type);
    let cards = Array(composition[type]).fill(c);
    deck = deck.concat(cards);
  }
  return deck;
}

class Card {
  constructor(type) {
    this.type = type;
  }
}

class Token {
  constructor(type, value) {
    this.type = type;
    this.value = value;
  }
}

class Player {
  constructor(hand, camels, tokens) {
    this.hand = hand;
    this.camels = camels;
    this.tokens = tokens;
  }
}

const Jaipur = Game({
  setup: () => ({  })
})

export default App;
