import React, { Component } from 'react';
import { Client } from 'boardgame.io/client';
import { Game } from 'boardgame.io/core';
import logo from './logo.svg';
import './App.css';
import { shuffle } from './utils.js';

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

const deckComposition = {
  'red': 6,
  'gold': 6,
  'silver': 6,
  'pink': 8,
  'green': 8,
  'brown': 10,
  'special': 8
}

const resourceTokenComposition = {
  'red': [5, 5, 5, 7, 7],
  'gold': [5, 5, 5, 6, 6],
  'silver': [5, 5, 5, 5, 5],
  'pink': [1, 1, 2, 2, 3, 3, 5],
  'green': [1, 1, 2, 2, 3, 3, 5],
  'brown': [1, 1, 1, 1, 1, 2, 3, 4],
}
const bonusTokenComposition = {
  'threes': [1, 1, 1, 2, 2, 2, 3, 3, 3],
  'fours': [4, 4, 5, 5, 6, 6],
  'fives': [8, 8, 9, 10, 10]
}

export function buildDeck(composition) {
  let deck = [];
  for (let [type, n] of composition) {
    let c = new Card(type);
    let cards = Array(n).fill(c);
    deck = deck.concat(cards);
  }
  return shuffle(deck);
}

export function buildTokens(composition) {
  let tokens = [];
  for (let [type, values] of composition) {
    let ts = [];
    for (let value of values) {
      let t = new Token(type, value);
      ts.push(t);
    }
    tokens.push(shuffle(ts));
  }
  return tokens;
}

export class Card {
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
  constructor(hand, tokens) {
    this.hand = hand;
    this.tokens = tokens;
  }
}

// Deal n cards from deck
function deal(deck, n) {
  let hand = [];
  for (let i = 0; i < n; i++) {
    hand.append(deck.pop);
    // TODO: check if deck is empty
  }
  return hand;
}

const Jaipur = Game({
  setup: () => {
    let deck = buildDeck(deckComposition);

    // Deal market with 3 special cards and 2 other cards
    let specialCards = new Card('special');
    let market = Array(3).fill(specialCards);
    market.append(deck.pop());
    market.append(deck.pop());

    // Deal both players their hands
    let players = [
      Player(deal(deck, 5), []),
      Player(deal(deck, 5), [])
    ];

    const G = {
      resourceTokens: buildTokens(resourceTokenComposition),
      bonusTokens: buildTokens(bonusTokenComposition),
      players: [p1, p2],
      selectedHand: [],
      selectedMarket: [],
      deck,
      market
    }
    return G;
  }
})

export default App;
