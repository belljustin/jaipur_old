import React, { Component } from 'react';
import { Client } from 'boardgame.io/client';
import { Game } from 'boardgame.io/core';
import logo from './logo.svg';
import './App.css';
import { shuffle, copyGame } from './utils.js';
import { Card, Token, Player } from './Models';

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

const deckComposition = new Map([
  ['red', 6],
  ['gold', 6],
  ['silver', 6],
  ['pink', 8],
  ['green', 8],
  ['brown', 10],
  ['special', 8]
]);

const resourceTokens = {
  'red': [5, 5, 5, 7, 7],
  'gold': [5, 5, 5, 6, 6],
  'silver': [5, 5, 5, 5, 5],
  'pink': [1, 1, 2, 2, 3, 3, 5],
  'green': [1, 1, 2, 2, 3, 3, 5],
  'brown': [1, 1, 1, 1, 1, 2, 3, 4]
};

const bonusTokens = {
  'threes': [1, 1, 1, 2, 2, 2, 3, 3, 3],
  'fours': [4, 4, 5, 5, 6, 6],
  'fives': [8, 8, 9, 10, 10]
};

export function buildDeck(composition) {
  let deck = [];
  for (let [type, n] of composition) {
    let c = new Card(type);
    let cards = Array(n).fill(c);
    deck = deck.concat(cards);
  }
  return shuffle(deck);
}

function buildBonusTokens(composition) {
  let tokens = buildTokens(composition);
  for (let i = 0; i < tokens.length; i++) {
    tokens[i] = shuffle(tokens[i]);
  }
  return tokens;
}

// Deal n cards from deck
export function deal(deck, n) {
  let hand = [];
  for (let i = 0; i < n; i++) {
    if (deck.length > 0) {
      hand.push(deck.pop());
    } else {
      hand.push(null);
    }
  }
  return hand;
}

export const pickUpSpecial = (G, ctx) => {
  let newG = copyGame(G);
  for (let i=0; i<newG.market.length; i++) {
    if (newG.market[i].type == "special") {
      newG.players[ctx.currentPlayer].hand.push(newG.market[i]);
      newG.market[i] = deal(newG.deck, 1)[0];    
    }
  }
  return newG;
}

export const pickUpSingle = (G, ctx) => {
  let newG = copyGame(G);
  // We assume there is only a single market card selected.
  let card = newG.market[newG.selectedMarket[0]];
  // Assume if the market goes below 5 cards, the check is left to the victory checker.
  if (newG.deck.length > 0) {
    newG.market[newG.selectedMarket[0]] = newG.deck.pop();
  }
  G.players[ctx.currentPlayer].hand.push(card);
  return newG;
}

export const pickUpMultiple = (G, ctx) => {
  let newG = copyGame(G);
  // TODO: Exchange cards in hand with cards in market.
  for (let i = 0; i < newG.selectedMarket.length; i++) {
    let tmp = newG.players[ctx.currentPlayer].hand[newG.selectedHand[i]];
    newG.players[ctx.currentPlayer].hand[G.selectedHand[i]] = newG.market[newG.selectedMarket[i]];
    newG.market[newG.selectedMarket[i]] = tmp;
  } 
  return newG;
}

export const buyTokens = (G, ctx) => {
  let newG = copyGame(G);
  for (let i=0; i < newG.selectedHand.length; i++) {
    
  }
}

export const toggleHandCard = (G, ctx, id) => {
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
}
  
export const toggleMarketCard = (G, ctx, id) => {
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

export const Jaipur = Game({
  setup: () => {
    let deck = buildDeck(deckComposition);

    // Deal market with 3 special cards and 2 other cards
    let specialCards = new Card('special');
    let market = Array(3).fill(specialCards);
    market.push(deck.pop());
    market.push(deck.pop());

    // Deal both players their hands
    let players = [
      new Player(deal(deck, 5), []),
      new Player(deal(deck, 5), [])
    ];

    const G = {
      resourceTokens: resourceTokens,
      bonusTokens: bonusTokens,
      selectedHand: [],
      selectedMarket: [],
      players,
      deck,
      market
    }
    return G;
  },

  moves: {
    pickUpSpecial,
    pickUpSingle,
    pickUpMultiple,
    buyTokens,
    toggleHandCard,
    toggleMarketCard
  }  
});

const Application = Client({game:Jaipur})
export default Application;
