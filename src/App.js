import React, { Component } from 'react';
import { Client } from 'boardgame.io/client';
import { Game } from 'boardgame.io/core';
import './App.css';
import { shuffle, copyGame } from './utils.js';
import { Card, Player } from './Models';
import { CardDisplay } from './components/CardDisplay';
import { TokenDisplay } from './components/token.js';
import { MoveButton } from './components/MoveButton.js';

class JaipurBoard extends Component {
  render() {
    let marketTable = [];
    let handTable = [];
    let p1Hand = this.props.G.players[0].hand;
    let p2Hand = this.props.G.players[1].hand;
    let market = this.props.G.market;
    let maxSize = p1Hand.length;
    if (p2Hand.length > maxSize) maxSize = p2Hand.length;
    else if (market.length > maxSize) maxSize = market.length;

    let marketCards = [];
    for (let i = 0; i < market.length; i++) {
      marketCards.push(
        <CardDisplay
          card={market[i]}
          key={market[i].id}
          onClick={() => this.props.moves.toggleMarketCard(i)}
        />);
    }
    marketTable.push(<tr>{marketCards}</tr>);

    let currentPlayer = this.props.ctx.currentPlayer;
    let hand = this.props.G.players[currentPlayer].hand;
    let handCards = [];
    for (let i = 0; i < hand.length; i++) {
      handCards.push(
        <CardDisplay
          card={hand[i]}
          key={hand[i].id}
          onClick={() => this.props.moves.toggleHandCard(i)}
        />);
    }
    handTable.push(<tr>{handCards}</tr>);

    let tokenCells = [];
    for (let key in this.props.G.resourceTokens) {
      tokenCells.push(<TokenDisplay tokenType={key} tokenValues={this.props.G.resourceTokens[key]} />)
    }
    for (let key in this.props.G.bonusTokens) {
      tokenCells.push(<TokenDisplay tokenType={key} tokenValues={this.props.G.bonusTokens[key]} hidden={true} />)
    }
    return (
      <div>
        <h1>Market</h1>
        <table id="market">
          <tbody>{marketTable}</tbody>
        </table>

        <h1>Hand</h1>
        <table id="hand">
          <tbody>{handTable}</tbody>
        </table>

        <h1>Tokens</h1>
        {tokenCells}

        <MoveButton onClick={this.props.moves.buyTokens} moveName='Buy Tokens' />
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
    if (newG.market[i].type === "special") {
      newG.players[ctx.currentPlayer].hand.push(newG.market[i]);
      newG.market[i] = deal(newG.deck, 1)[0];    
    }
  }
  return newG;
}

export const pickUpSingle = (G, ctx) => {
  let newG = copyGame(G);
  // We assume there is only a single market card selected.
  let card = null;
  for (let i = 0; i < newG.market.length; i++) {
    if (newG.market[i].selected) {
      card = newG.market[i];
      newG.market[i] = deal(newG.deck, 1)[0];
      newG.players[ctx.currentPlayer].hand.push(card);
      break;
    }
  }
  // Assume if the market goes below 5 cards, the check is left to the victory checker.
  return newG;
}

export const pickUpMultiple = (G, ctx) => {
  let newG = copyGame(G);
  let hand = newG.players[ctx.currentPlayer].hand;
  let market = newG.market;
  // Exchange cards in hand with cards in market.
  let marketIndices = [];
  let handIndices = [];
  for (let i = 0; i < hand.length; i++) {
    if (hand[i].selected) handIndices.push(i);
  }
  for (let i = 0; i < market.length; i++) {
    if (market[i].selected) marketIndices.push(i);
  }
  
  for (let i = 0; i < marketIndices.length; i++) {
    let tmp = hand[handIndices[i]];
    hand[handIndices[i]] = market[marketIndices[i]];
    market[marketIndices[i]] = tmp;
  } 
  return newG;
}

export const buyTokens = (G, ctx) => {
  let newG = copyGame(G);
  let newHand = [];
  let hand = newG.players[ctx.currentPlayer].hand;
  let numCards = 0;

  for (let i=0; i < hand.length; i++) {
    let cardType = hand[i].type;
    if (hand[i].selected) {
      numCards += 1;
      if (newG.resourceTokens[cardType].length > 0) {
        newG.players[ctx.currentPlayer].tokens.push(newG.resourceTokens[cardType].pop());
      }
    } else {
      newHand.push(hand[i]);
    }
  }
  newG.players[ctx.currentPlayer].hand = newHand;

  let pile = [];
  if (numCards === 3) pile = newG.bonusTokens['threes'];
  else if (numCards === 4) pile = newG.bonusTokens['fours'];
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

export const endGameIf = (G, ctx) => {
  // TODO: return who won
  // Check if unable to fill market
  for (let c of G.market) {
    if (c === null) {
      return true;
    }
  }

  // Check if three resource tokens are gone
  let cnt = 0;
  for (let t in G.resourceTokens) {
    if (G.resourceTokens[t].length === 0) {
      cnt++;
    }

    if (cnt >= 3) {
      return true;
    }
  }
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
    },
    endGameIf
  }
});

const Application = Client({game:Jaipur, board:JaipurBoard})
export default Application;
