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
  'threes': shuffle([1, 1, 1, 2, 2, 2, 3, 3, 3]),
  'fours': shuffle([4, 4, 5, 5, 6, 6]),
  'fives': shuffle([8, 8, 9, 10, 10])
};

export function buildDeck(composition) {
  let deck = [];
  for (let [type, n] of composition) {
    let cards = Array(n);
    for (let i=0; i<n; i++) {
      cards[i] = new Card(type);
    }
    deck = deck.concat(cards);
  }
  return shuffle(deck);
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
  newG.market[newG.selectedMarket[0]] = deal(newG.deck, 1)[0];
  newG.players[ctx.currentPlayer].hand.push(card);
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
  let newHand = [];
  for (let i=0; i < newG.players[ctx.currentPlayer].hand.length; i++) {
    if (newG.selectedHand.includes(i)) {
      let cardType = newG.players[ctx.currentPlayer].hand[i].type;
      if (newG.resourceTokens[cardType].length > 0) {
        newG.players[ctx.currentPlayer].tokens.push(newG.resourceTokens[cardType].pop());
      }
    } else {
      newHand.push(newG.players[ctx.currentPlayer].hand[i]);
    }
  }
  newG.players[ctx.currentPlayer].hand = newHand;
  let numCards = newG.selectedHand.length;
  let pile = [];
  if (numCards == 3) pile = newG.bonusTokens['threes'];
  else if (numCards == 4) pile = newG.bonusTokens['fours'];
  else if (numCards >= 5) pile = newG.bonusTokens['fives'];
  
  if (pile.length > 0) newG.players[ctx.currentPlayer].tokens.push(pile.pop());
  return newG;
}

export const toggleHandCard = (G, ctx, id) => {
  let newG = copyGame(G);
  let card = newG.players[ctx.currentPlayer].hand[id];
  if (card.selected) {
    card.selected = false;
  } else {
    card.selected = true;
  }
  return newG;
}
  
export const toggleMarketCard = (G, ctx, id) => {
  let newG = copyGame(G);

  let card = newG.market[id];
  if (card.selected) {
    card.selected = false;
  } else {
    card.selected = true;
  }  
  return newG;
}

export const Jaipur = Game({
  setup: () => {
    let deck = buildDeck(deckComposition);

    // Deal market with 3 special cards and 2 other cards
    let market = Array(3);
    for (let i=0; i<3; i++) {
      market[i] = new Card("special");
    }
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
  },

  flow: {
    onTurnEnd: (G, ctx) => {
      let newG = copyGame(G);
      for (let i=0; i < 2; i++) {
        for (let j=0; j<newG.players[i].hand.length; j++) {
          newG.players[i].hand[j].selected = false;
        }
      }
      for (let j=0; j < newG.market.length; j++) {
        newG.market[j].selected = false;
      }
      return newG;
    }
  }  
});

const Application = Client({game:Jaipur})
export default Application;
