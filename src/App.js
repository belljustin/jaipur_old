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

const deckComposition = [8, 6, 6, 6, 8, 8, 10];
export function buildDeck(composition) {
  let deck = [];
  for (let type = 0; type < composition.length; type++) {
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
  setup: () => ({  }),

  moves: {
    pickUpSpecial(G, ctx) {
      return G;
    },
    pickUpSingle(G, ctx) {
      return G;
    },
    pickUpMultiple(G, ctx) {
      return G;
    },
    buyTokens(G, ctx, cardsToTrade){
      return G;
    },
    toggleHandCard(G, ctx, id){
      let newG = {...G};
      if (!newG.selectedHand){
        newG.selectedHand = [];
      }
      if (newG.selectedHand.includes(id)) {
        let removeId = newG.selectedHand.indexOf(id);
        newG.selectedHand.splice(removeId, 1);
      } else {
        newG.selectedHand.push(id);
      }
      return newG;
    },
    toggleMarketCard(G, ctx, id){
      let newG = {...G};
      if (!newG.selectedMarket){
        newG.selectedMarket = [];
      }
      if (newG.selectedMarket.includes(id)){
        let removeId = newG.selectedMarket.indexOf(id);
        newG.selectedMarket.splice(removeId, 1);
      } else {
        newG.selectedMarket.push(id);
      }      
      return newG;
    }
  }  
})

const Application = Client({game:Jaipur})
export default Application;
